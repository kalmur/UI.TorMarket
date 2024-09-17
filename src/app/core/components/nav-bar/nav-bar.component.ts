import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  categories = [
    'Electronics', 
    'Furniture', 
    'Vehicles', 
    'Clothing', 
    'Jobs', 
    'Real Estate'
  ];
}