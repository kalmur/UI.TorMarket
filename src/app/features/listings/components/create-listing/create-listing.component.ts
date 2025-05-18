import { Component, model, signal } from '@angular/core';
import { ListingFormComponent } from '../listing-form/listing-form.component';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { ListingFormPreviewComponent } from '../listing-form-preview/listing-form-preview.component';
import { ICreateListingFormDetails } from '../../models/listings';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [
    NavBarComponent,
    ListingFormComponent,
    ListingFormPreviewComponent
  ],
  templateUrl: './create-listing.component.html',
  styleUrl: './create-listing.component.scss'
})
export class CreateListingComponent {
  listing = model<ICreateListingFormDetails>({
    name: '',
    category: 0,
    price: 0,
    description: ''
  });
  
  imagePreviewUrl = signal<string | null>(null);

  onListingChanged(listing: ICreateListingFormDetails): void {
    this.listing.set(listing);
  }

  onImagePreviewUrlChange(url: string | null) {
    this.imagePreviewUrl.set(url);
  }
}
