import { Component, Inject } from '@angular/core';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { ProductFormComponent } from '../listing-form/listing-form.component';
import { ListingPreviewComponent } from '../listing-review/listing-preview.component';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [
    NavBarComponent,
    ProductFormComponent,
    ListingPreviewComponent
  ],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.scss'
})
export class SellComponent {
  product: any = {};

  onProductChanged(product: any) {
    this.product = product;
  }
}
