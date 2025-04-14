import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../../listings/models/listings';

@Component({
  selector: 'app-toys',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './toys.component.html',
  styleUrl: './toys.component.scss'
})
export class ToysComponent {
  categoryName: string = 'Toys';
}
