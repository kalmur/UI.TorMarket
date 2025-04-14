import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../../listings/models/listings';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  categoryName: string = 'Games';
  listings: IListing[] = [];
}