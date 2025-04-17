import { Component } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';

@Component({
  selector: 'app-user-listings',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './user-listings.component.html',
  styleUrl: './user-listings.component.scss'
})
export class UserListingsComponent {
  title = 'My listings';
}