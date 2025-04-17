import { Component } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.scss'
})
export class ClothingComponent {
  categoryName = 'Clothing';
}
