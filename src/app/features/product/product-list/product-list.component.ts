import { Component, inject } from '@angular/core';
import { IProduct } from '../../../core/models/model';
import { ProductService } from '../services/product.service';
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
        "listingId": 1,
        "userId": 201,
        "categoryId": 1,
        "name": "MSI GE76 Raider",
        "sellLease": 1,
        "description": "High-performance gaming laptop with a powerful GPU and fast processor.",
        "price": 2500,
        "city": "Edinburgh",
        "country": "Scotland",
        "availableFrom": new Date('2024-10-01'),
        "rating": 4
      },
      {
        "listingId": 2,
        "userId": 202,
        "categoryId": 2,
        "name": "Logitech GPROX",
        "sellLease": 1,
        "description": "Precision gaming mouse with customizable buttons and RGB lighting.",
        "price": 130,
        "city": "Glasgow",
        "country": "Scotland",
        "rating": 3
      },
      {
        "listingId": 3,
        "userId": 203,
        "categoryId": 3,
        "name": "Sony WH-1000XM4",
        "sellLease": 1,
        "description": "Wireless noise-canceling headphones with superior sound quality.",
        "price": 350,
        "city": "Aberdeen",
        "country": "Scotland",
        "availableFrom": new Date('2024-11-01'),
        "rating": 5
      },
      {
        "listingId": 4,
        "userId": 204,
        "categoryId": 4,
        "name": "Apple iPad Pro 12.9",
        "sellLease": 1,
        "description": "High-end tablet with M1 chip and large Retina display.",
        "price": 1100,
        "city": "Dundee",
        "country": "Scotland",
        "availableFrom": new Date('2024-12-01'),
        "rating": 1
      },
      {
        "listingId": 5,
        "userId": 205,
        "categoryId": 5,
        "name": "Dell XPS 13",
        "sellLease": 1,
        "description": "Compact laptop with a sleek design and high-resolution display.",
        "price": 1400,
        "city": "Inverness",
        "country": "Scotland",
        "availableFrom": new Date('2024-10-15'),
        "rating": 2
      },
      {
        "listingId": 6,
        "userId": 206,
        "categoryId": 6,
        "name": "Samsung Galaxy S23 Ultra",
        "sellLease": 1,
        "description": "Latest smartphone with advanced camera features and high performance.",
        "price": 1200,
        "city": "Stirling",
        "country": "Scotland",
        "availableFrom": new Date('2024-11-15'),
        "rating": 3
      },
      {
        "listingId": 7,
        "userId": 207,
        "categoryId": 7,
        "name": "LG OLED TV 55\"",
        "sellLease": 1,
        "description": "55-inch OLED TV with stunning color accuracy and contrast.",
        "price": 1800,
        "city": "Perth",
        "country": "Scotland",
        "availableFrom": new Date('2024-12-15'),
        "rating": 2
      },
      {
        "listingId": 8,
        "userId": 208,
        "categoryId": 8,
        "name": "Bose QuietComfort 35 II",
        "sellLease": 1,
        "description": "Wireless headphones with world-class noise cancellation and comfortable fit.",
        "price": 300,
        "city": "Ayr",
        "country": "Scotland",
        "availableFrom": new Date('2024-10-20'),
        "rating": 5
      },
      {
        "listingId": 9,
        "userId": 209,
        "categoryId": 9,
        "name": "Razer BlackWidow V3",
        "sellLease": 1,
        "description": "Mechanical gaming keyboard with customizable RGB backlighting.",
        "price": 150,
        "city": "Falkirk",
        "country": "Scotland",
        "availableFrom": new Date('2024-11-20'),
        "rating": 4
      },
      {
        "listingId": 10,
        "userId": 210,
        "categoryId": 10,
        "name": "Corsair Vengeance LPX 16GB",
        "sellLease": 1,
        "description": "High-performance RAM with fast speeds for gaming and productivity.",
        "price": 80,
        "city": "Kilmarnock",
        "country": "Scotland",
        "availableFrom": new Date('2024-12-01'),
        "rating": 4
      },
      {
        "listingId": 11,
        "userId": 211,
        "categoryId": 11,
        "name": "Acer Predator XB273K",
        "sellLease": 1,
        "description": "27-inch 4K gaming monitor with high refresh rate and G-SYNC support.",
        "price": 700,
        "city": "Paisley",
        "country": "Scotland",
        "availableFrom": new Date('2024-10-05'),
        "rating": 2
      },
      {
        "listingId": 12,
        "userId": 212,
        "categoryId": 12,
        "name": "Microsoft Surface Laptop 4",
        "sellLease": 1,
        "description": "Sleek and stylish laptop with a high-resolution touchscreen and long battery life.",
        "price": 1300,
        "city": "Dunfermline",
        "country": "Scotland",
        "availableFrom": new Date('2024-11-05'),
        "rating": 5
      }
    ]
  }
}
