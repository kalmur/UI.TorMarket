import { Component, model } from '@angular/core';
import { ListingFormComponent } from '../listing-form/listing-form.component';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { ListingFormPreviewComponent } from '../listing-form-preview/listing-form-preview.component';
import { IListingFormDetails } from '../../models/listings';

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
  listing = model<IListingFormDetails>({
    name: '',
    description: '',
    price: 0,
    category: '',
    availableFrom: new Date(),
    imageUrl: ''
  });

  onListingChanged(listing: IListingFormDetails): void {
    this.listing.set(listing);
  }
}
