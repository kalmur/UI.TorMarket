import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProductFormDetails } from '../../models/product';

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss'
})
export class ProductPreviewComponent {
  @Input() product?: IProductFormDetails;
}
