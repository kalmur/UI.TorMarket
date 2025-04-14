import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../../listings/models/listings';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss'
})
export class OtherComponent {
  categoryName: string = 'Other';
}
