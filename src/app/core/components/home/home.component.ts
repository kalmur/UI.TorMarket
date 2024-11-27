import { Component, inject, Inject, Input } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ProductListComponent } from '../products/product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title: string = 'Best sellers';

  constructor() {
  }
}
