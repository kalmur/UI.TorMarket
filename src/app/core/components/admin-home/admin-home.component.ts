import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from '../products/product-list/product-list.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavBarComponent, ProductListComponent, RouterOutlet],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {

}
