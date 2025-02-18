import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  private readonly auth = inject(AuthService);

  categories: string[] = []

  constructor() {
    this.categories = [
      'Electronics', 
      'Games', 
      'Toys', 
      'Clothing', 
      'Vehicles', 
      'Pets',
      'Other'
    ]
  }

  login() {
    this.auth.loginWithRedirect();
  }
}