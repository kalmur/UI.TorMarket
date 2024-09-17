import { Component, inject } from '@angular/core';
import { IProduct } from '../../../model/model';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: IProduct[] = [];

  productService = inject(ProductService);

  constructor() {
    this.products = [
      {
        listingId: 1,
        userId: 101,
        categoryId: 5,
        name: 'Luxury Apartment',
        sellLease: 1, // 1 for sell, 0 for lease
        description: 'A spacious luxury apartment in the city center.',
        price: 250000,
        city: 'New York',
        country: 'USA',
        availableFrom: new Date('2024-01-15'),
        rating: 4.8
      },
      {
        listingId: 2,
        userId: 102,
        categoryId: 3,
        name: 'Beach House',
        sellLease: 0, // Lease option
        description: 'A beautiful beach house with ocean views.',
        price: 3500, // Monthly rent
        city: 'Malibu',
        country: 'USA',
        rating: 4.7
      },
      {
        listingId: 3,
        userId: 103,
        categoryId: 1,
        name: 'Mountain Cabin',
        sellLease: 1,
        description: 'Cozy cabin located in the mountains.',
        price: 150000,
        city: 'Aspen',
        country: 'USA',
        availableFrom: new Date('2024-06-01'),
        rating: 4.9
      },
      {
        listingId: 1,
        userId: 101,
        categoryId: 5,
        name: 'Luxury Apartment',
        sellLease: 1, // 1 for sell, 0 for lease
        description: 'A spacious luxury apartment in the city center.',
        price: 250000,
        city: 'New York',
        country: 'USA',
        availableFrom: new Date('2024-01-15'),
        rating: 4.8
      },
      {
        listingId: 2,
        userId: 102,
        categoryId: 3,
        name: 'Beach House',
        sellLease: 0, // Lease option
        description: 'A beautiful beach house with ocean views.',
        price: 3500, // Monthly rent
        city: 'Malibu',
        country: 'USA',
        rating: 4.7
      },
      {
        listingId: 3,
        userId: 103,
        categoryId: 1,
        name: 'Mountain Cabin',
        sellLease: 1,
        description: 'Cozy cabin located in the mountains.',
        price: 150000,
        city: 'Aspen',
        country: 'USA',
        availableFrom: new Date('2024-06-01'),
        rating: 4.9
      }
    ]
  }
}
