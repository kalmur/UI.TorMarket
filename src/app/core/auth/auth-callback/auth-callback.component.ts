import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthHelperService } from '../services/auth-helper.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: '<p>Signing you in…</p>',
})
export class AuthCallbackComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly authHelper = inject(AuthHelperService);

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    this.authHelper.handleCallback(
      params.get('code'),
      params.get('error'),
      params.get('error_description'),
    );
  }
}
