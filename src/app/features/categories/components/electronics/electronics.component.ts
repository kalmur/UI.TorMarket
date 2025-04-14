import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../../listings/models/listings';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.scss'
})
export class ElectronicsComponent {
  categoryName: string = 'Electronics';
  listings: IListing[] = [];
}
