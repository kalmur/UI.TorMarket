import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UrlProviderService } from './url-provider.service';
import { IDatabaseUser } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly urlProvider = inject(UrlProviderService);
  private readonly httpClient = inject(HttpClient);
  private readonly toastr = inject(ToastrService);

  async createUserInDatabase(providerId: string | undefined): Promise<IDatabaseUser> {
    const url = `${this.urlProvider.createUser}/${providerId}`;

    try {
      return await firstValueFrom(this.httpClient.post<IDatabaseUser>(url, {}));
    } catch (error) {
      this.toastr.error("Failed to create user in database");
      throw error;
    }
  }

  async getUserByProviderId(providerId: string): Promise<IDatabaseUser> {
    const url = this.urlProvider.getUserByProviderId(providerId);

    try {
      return await firstValueFrom(this.httpClient.get<IDatabaseUser>(url));
    } catch (error) {
      this.toastr.error("Failed to get user by provider ID");
      throw error;
    }
  }
}
