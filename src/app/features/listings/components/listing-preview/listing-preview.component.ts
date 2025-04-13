import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IListingFormDetails } from '../../models/listings';

@Component({
  selector: 'app-listing-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-preview.component.html',
  styleUrl: './listing-preview.component.scss'
})
export class ListingPreviewComponent {
  @Input() listing?: IListingFormDetails;
}
