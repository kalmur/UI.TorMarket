import { Component } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { ListingCategoryService } from '../../services/listing-category.service';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.scss'
})
export class ClothingComponent {
  categoryName: string = 'Clothing';
}
