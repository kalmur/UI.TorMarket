import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlProviderService } from './url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly urlProvider = inject(UrlProviderService);

  createUserInDatabase(providerId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.urlProvider.createUser}/${providerId}`;

    return this.http.post(
      url, 
      {}, 
      { headers }
    );
  }
}
