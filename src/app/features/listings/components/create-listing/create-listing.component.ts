import { Component } from '@angular/core';
import { ListingFormComponent } from '../listing-form/listing-form.component';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { ListingFormPreviewComponent } from '../listing-form-preview/listing-form-preview.component';

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
  // listing: any = {};

  // onListingChanged(listing: any) {
  //   this.listing = listing;
  // }
}
