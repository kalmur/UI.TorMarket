import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponseModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = '';

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(this.url + '/all');
  }
}
