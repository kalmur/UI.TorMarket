import { Component, Input } from '@angular/core';
import { IProduct } from '../../../model/model';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: IProduct;
}
