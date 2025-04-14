import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.scss'
})
export class ClothingComponent {
  categoryName: string = 'Clothing';
}
