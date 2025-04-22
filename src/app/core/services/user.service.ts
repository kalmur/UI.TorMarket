import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlProviderService } from './url-provider.service';
import { IListing } from '../../features/listings/models/listings';
import { IDatabaseUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly urlProvider = inject(UrlProviderService);
  private readonly httpClient = inject(HttpClient);

  createUserInDatabase(providerId: string | undefined): Observable<IListing> {
    const url = `${this.urlProvider.createUser}/${providerId}`;
    
    return this.httpClient.post<IListing>(url, {});
  }

  getUserByProviderId(providerId: string): Observable<IDatabaseUser> {
    const url = this.urlProvider.getUserByProviderId(providerId);

    return this.httpClient.get<IDatabaseUser>(url);
  }
}
