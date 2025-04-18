import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  title = 'Searched Listings';
  searchTerm = '';

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
    });
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    console.log('Search term updated in ClothingComponent:', this.searchTerm);
  }
}