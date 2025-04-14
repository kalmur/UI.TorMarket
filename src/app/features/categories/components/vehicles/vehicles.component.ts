import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../../listings/models/listings';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  categoryName: string = 'Vehicles';
}