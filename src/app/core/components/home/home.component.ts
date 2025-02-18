import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ProductListComponent } from '../../../features/product/product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() title = 'Best sellers';

  constructor() {
  }
}
