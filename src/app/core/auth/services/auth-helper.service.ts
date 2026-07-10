import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { authConfig } from '../config/auth.config';
import { UrlProviderService } from '../../services/url-provider.service';

export interface AuthUser {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
  [key: string]: unknown;
}

interface TokenResponseDto {
  accessToken: string;
  idToken?: string;
  tokenType: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly urlProvider = inject(UrlProviderService);
  private readonly toastr = inject(ToastrService);

  private refreshTimerId: ReturnType<typeof setTimeout> | null = null;
  private readonly _accessToken = signal<string | null>(null);
  private _sessionRestored: Promise<void> | null = null;

  user = signal<AuthUser | null>(null);
  isAuthenticated = signal(false);

  readonly accessToken = computed(() => this._accessToken());

  constructor() {
    this._sessionRestored = this.tryRestoreSession();
  }

  /**
   * Returns a promise that resolves once the initial session restore
   * attempt has completed. Used by APP_INITIALIZER so route guards
   * see the correct auth state on first navigation.
   */
  whenSessionRestored(): Promise<void> {
    return this._sessionRestored ?? Promise.resolve();
  }

  login(): void {
    this.redirectToAuthorize();
  }

  signUp(): void {
    this.redirectToAuthorize('signup');
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(this.urlProvider.authLogout, {}, { withCredentials: true })
      );
    } catch {
      // Best-effort revocation — clear local state regardless
    }

    this.clearAuthState();

    // End the IdP session and redirect back
    const params = new URLSearchParams({
      client_id: authConfig.clientId,
      returnTo: window.location.origin,
    });
    window.location.href = `${authConfig.logoutUrl}?${params}`;
  }

  async handleCallback(code: string | null, error: string | null, errorDescription: string | null): Promise<void> {
    if (error) {
      this.toastr.error(errorDescription || error, 'Authentication failed');
      this.router.navigateByUrl('/');
      return;
    }

    if (!code) {
      this.toastr.error('No authorization code received.', 'Authentication failed');
      this.router.navigateByUrl('/');
      return;
    }

    // Validate state to prevent CSRF
    const expectedState = sessionStorage.getItem('oauth_state');
    sessionStorage.removeItem('oauth_state');

    const returnedState = new URLSearchParams(window.location.search).get('state');
    if (!expectedState || expectedState !== returnedState) {
      this.toastr.error('Invalid state parameter. Please try again.', 'Authentication failed');
      this.router.navigateByUrl('/');
      return;
    }

    const codeVerifier = sessionStorage.getItem('pkce_code_verifier');
    sessionStorage.removeItem('pkce_code_verifier');

    if (!codeVerifier) {
      this.toastr.error('Missing PKCE code verifier. Please try again.', 'Authentication failed');
      this.router.navigateByUrl('/');
      return;
    }

    const body = {
      code,
      redirectUri: authConfig.redirectUri,
      codeVerifier,
    };

    try {
      const response = await firstValueFrom(
        this.http.post<TokenResponseDto>(this.urlProvider.authExchangeCode, body, {
          withCredentials: true,
        })
      );

      this.setAuthState(response);

      const returnUrl = sessionStorage.getItem('auth_return_url') || '/';
      sessionStorage.removeItem('auth_return_url');
      this.router.navigateByUrl(returnUrl);
    } catch {
      this.toastr.error('Failed to exchange authorization code.', 'Authentication failed');
      this.router.navigateByUrl('/');
    }
  }

  navigateToSellPage(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/sell']);
    } else {
      this.router.navigate(['/auth-prompt'], {
        queryParams: {
          action: 'sell'
        }
      });
    }
  }

  // ── Private ────────────────────────────────────────────

  private async redirectToAuthorize(screenHint?: string): Promise<void> {
    const { codeVerifier, codeChallenge } = await generatePkce();
    const state = generateRandomState();

    sessionStorage.setItem('pkce_code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);
    sessionStorage.setItem('auth_return_url', this.router.url);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: authConfig.clientId,
      redirect_uri: authConfig.redirectUri,
      audience: authConfig.audience,
      scope: authConfig.scope,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state,
    });

    if (screenHint) {
      params.set('screen_hint', screenHint);
    }

    window.location.href = `${authConfig.authorizeUrl}?${params}`;
  }

  private setAuthState(response: TokenResponseDto): void {
    this._accessToken.set(response.accessToken);
    this.isAuthenticated.set(true);

    if (response.idToken) {
      const payload = decodeJwtPayload(response.idToken);
      this.user.set(payload as AuthUser);
    }

    this.scheduleTokenRefresh(response.expiresIn);
  }

  private clearAuthState(): void {
    this._accessToken.set(null);
    this.user.set(null);
    this.isAuthenticated.set(false);
    if (this.refreshTimerId) {
      clearTimeout(this.refreshTimerId);
      this.refreshTimerId = null;
    }
  }

  private scheduleTokenRefresh(expiresIn: number): void {
    if (this.refreshTimerId) {
      clearTimeout(this.refreshTimerId);
    }

    // Only schedule if we have a meaningful expiry (at least 2 minutes)
    if (!expiresIn || expiresIn < 120) {
      return;
    }

    // Refresh 60 seconds before expiry
    const delayMs = (expiresIn - 60) * 1000;
    this.refreshTimerId = setTimeout(() => this.refreshAccessToken(), delayMs);
  }

  private async refreshAccessToken(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<TokenResponseDto>(this.urlProvider.authRefresh, {}, {
          withCredentials: true,
        })
      );
      this.setAuthState(response);
    } catch {
      this.clearAuthState();
      this.toastr.warning('Your session has expired. Please sign in again.', 'Session expired');
    }
  }

  private async tryRestoreSession(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<TokenResponseDto>(this.urlProvider.authRefresh, {}, {
          withCredentials: true,
        })
      );
      this.setAuthState(response);
    } catch {
      // No valid session — stay logged out
    }
  }
}

// ── PKCE helpers ───────────────────────────────────────────

function base64UrlEncode(buffer: Uint8Array): string {
  let binary = '';
  for (const byte of buffer) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}

async function generatePkce(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  return { codeVerifier, codeChallenge };
}

function generateRandomState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

function decodeJwtPayload(token: string): Record<string, unknown> {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}
