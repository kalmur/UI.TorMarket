import { Component } from '@angular/core';
import { NavBarComponent } from '../../../core/components/nav-bar/nav-bar.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductPreviewComponent } from '../product-preview/product-preview.component';

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [
    NavBarComponent,
    ProductFormComponent,
    ProductPreviewComponent
  ],
  templateUrl: './sell-product.component.html',
  styleUrl: './sell-product.component.scss'
})
export class SellProductComponent {
  product: any = {};

  onProductChange(product: any) {
    this.product = product;
  }
}
