import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UrlProviderService } from './url-provider.service';
import { CreateUserRequest, DatabaseUser } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../auth/services/auth-helper.service';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly authHelperService = inject(AuthHelperService);
  private readonly authService = inject(AuthService);
  private readonly urlProvider = inject(UrlProviderService);
  private readonly httpClient = inject(HttpClient);
  private readonly toastr = inject(ToastrService);

  async createUserInDatabase(createUserRequest: CreateUserRequest): Promise<DatabaseUser> {
    const url = this.urlProvider.createUser;

    try {
      return await firstValueFrom(this.httpClient.post<DatabaseUser>(url, createUserRequest));
    } catch (error) {
      this.toastr.error("Failed to create user in database");
      throw error;
    }
  }

  async getUserByProviderId(providerId: string): Promise<DatabaseUser> {
    const url = this.urlProvider.getUserByProviderId(providerId);

    try {
      return await firstValueFrom(this.httpClient.get<DatabaseUser>(url));
    } catch (error) {
      this.toastr.error("Failed to get user by provider ID");
      throw error;
    }
  }

  async getAllUsers(): Promise<DatabaseUser[]> {
    const url = this.urlProvider.getAllUsers;
    const token = await firstValueFrom(this.authService.getAccessTokenSilently());

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    try {
      return await firstValueFrom(
        this.httpClient.get<DatabaseUser[]>(url, headers ? { headers } : {})
      );
    } catch (error) {
      this.toastr.error('Failed to fetch all users');
      throw error;
    }
  }

  async getUserId(): Promise<number> {
    const user = this.authHelperService.user();
    if (user && user.sub) {
      const dbUser = await this.getUserByProviderId(user.sub);
      return dbUser.userId;
    } else {
      throw new Error('User not found');
    }
  }
}
