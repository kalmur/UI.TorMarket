import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';
import { IListing } from '../../models/listings';
import { ListingCategoryService } from '../../../categories/services/listing-category.service';
import { SearchService } from '../../../../core/services/search.service';

@Component({
  selector: 'app-listing-list',
  standalone: true,
  imports: [
    ListingCardComponent, 
    CommonModule
  ],
  templateUrl: './listing-list.component.html',
  styleUrl: './listing-list.component.scss'
})
export class ListingListComponent {
  @Input() listings: IListing[] = [];
  @Input() searchTerm: string = '';
  @Input() categoryName: string = '';
}
