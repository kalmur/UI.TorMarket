import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IListingFormDetails } from '../../models/listings';

@Component({
  selector: 'app-listing-form-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-form-preview.component.html',
  styleUrl: './listing-form-preview.component.scss'
})
export class ListingFormPreviewComponent {
  @Input() listing?: IListingFormDetails;
}
