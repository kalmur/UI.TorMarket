import { Component } from '@angular/core';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { ListingFormComponent } from '../listing-form/listing-form.component';
import { ListingFormPreviewComponent } from '../listing-form-preview/listing-form-preview.component';

@Component({
  selector: 'app-edit-listing',
  standalone: true,
  imports: [
    NavBarComponent,
    ListingFormComponent,
    ListingFormPreviewComponent
  ],
  templateUrl: './edit-listing.component.html',
  styleUrl: './edit-listing.component.scss'
})
export class EditListingComponent {
  // listing: any = {};

  // onListingChanged(listing: any) {
  //   this.listing = listing;
  // }
}
