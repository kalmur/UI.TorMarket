import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.scss'
})
export class ClothingComponent {
  searchTerm: string = '';
  categoryName: string = 'Clothing';

  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    console.log('Search term updated in ClothingComponent:', this.searchTerm);
  }
}
