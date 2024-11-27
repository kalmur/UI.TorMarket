import { Component, Input } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.scss'
})
export class ElectronicsComponent {
}