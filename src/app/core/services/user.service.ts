import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlProviderService } from './url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly urlProvider: UrlProviderService
  ) {}

  // Create return type for this
  createUserInDatabase(providerId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.urlProvider.createUser}/${providerId}`;

    return this.httpClient.post(
      url, 
      {}, 
      { headers }
    );
  }
}
