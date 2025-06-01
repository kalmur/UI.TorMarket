import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UrlProviderService } from './url-provider.service';
import { DatabaseUser } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from '../auth/services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly authHelperService = inject(AuthHelperService);
  private readonly urlProvider = inject(UrlProviderService);
  private readonly httpClient = inject(HttpClient);
  private readonly toastr = inject(ToastrService);

  async createUserInDatabase(providerId: string | undefined): Promise<DatabaseUser> {
    const url = `${this.urlProvider.createUser}/${providerId}`;

    try {
      return await firstValueFrom(this.httpClient.post<DatabaseUser>(url, {}));
    } catch (error) {
      this.toastr.error("Failed to create user in database");
      throw error;
    }
  }

  async getByProviderId(providerId: string): Promise<DatabaseUser> {
    const url = this.urlProvider.getUserByProviderId(providerId);

    try {
      return await firstValueFrom(this.httpClient.get<DatabaseUser>(url));
    } catch (error) {
      this.toastr.error("Failed to get user by provider ID");
      throw error;
    }
  }

  async fetchUserId(): Promise<number> {
    const user = this.authHelperService.user();
    if (user && user.sub) {
      const dbUser = await this.getByProviderId(user.sub);
      return dbUser.userId;
    } else {
      throw new Error('User not found');
    }
  }
}
