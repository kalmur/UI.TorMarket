import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { firstValueFrom } from 'rxjs';
import { ICategory } from '../../../core/models/categories';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ListingCategoryService {
  private readonly httpClient = inject(HttpClient);
  private readonly urlProvider = inject(UrlProviderService);
  private readonly toastr = inject(ToastrService);

  async getAllListingCategories(): Promise<ICategory[]> {
    const endPoint = this.urlProvider.getAllListingCategories;

    try {
      return firstValueFrom(this.httpClient.get<ICategory[]>(endPoint));
    } catch (error) {
      this.toastr.error('Failed to get all listing categories');
      throw error;
    }
  }
}
