import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICreateListingFormDetails } from '../../models/listings';

@Component({
  selector: 'app-listing-form-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-form-preview.component.html',
  styleUrl: './listing-form-preview.component.scss'
})
export class ListingFormPreviewComponent {
  listing = input<ICreateListingFormDetails>();
  imagePreviewUrl = input<string | null>(null);
}
