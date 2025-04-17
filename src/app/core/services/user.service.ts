import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlProviderService } from './url-provider.service';
import { IListing } from '../../features/listings/models/listings';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly urlProvider: UrlProviderService
  ) {}

  // Create return type for this
  createUserInDatabase(providerId: string): Observable<IListing> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.urlProvider.createUser}/${providerId}`;

    return this.httpClient.post<IListing>(
      url, 
      {}, 
      { headers }
    );
  }
}
