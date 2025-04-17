import { Component } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';

@Component({
  selector: 'app-toys',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './toys.component.html',
  styleUrl: './toys.component.scss'
})
export class ToysComponent {
  categoryName = 'Toys';
}
