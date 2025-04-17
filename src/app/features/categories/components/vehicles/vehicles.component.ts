import { Component } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  categoryName = 'Vehicles';
}