import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../core/models/model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule, ProductListComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: IProduct;
}
