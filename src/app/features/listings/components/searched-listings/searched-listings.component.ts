import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../../core/services/search.service';
import { IListing } from '../../models/listings';
import { HomeComponent } from '../../../../core/components/home/home.component';

@Component({
  selector: 'app-searched-listings',
  standalone: true,
  imports: [
    HomeComponent
  ],
  templateUrl: './searched-listings.component.html',
  styleUrls: ['./searched-listings.component.scss']
})
export class SearchedListingsComponent implements OnInit {
  title: string = 'Searched Listings';
  searchTerm: string = '';
  listings: IListing[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'] || '';
    });
  }
}