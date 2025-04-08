import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingListComponent } from '../listing-list/listing-list.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { IListing } from '../../models/listings';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule, ListingListComponent],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.scss'
})
export class ListingCardComponent {

  @Input() product!: IListing;
}
