import { Component } from '@angular/core';
import { NavBarComponent } from '../../../core/components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [
     NavBarComponent,
     CommonModule,
     ReactiveFormsModule
  ],
  templateUrl: './sell-product.component.html',
  styleUrl: './sell-product.component.scss'
})
export class SellProductComponent {
  listingForm: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.listingForm = this.fb.group({
        name: [''],
        category: [''],
        price: [''],
        address: [''],
        city: [''],
        state: [''],
        zip: [''],
        availableFrom: [''],
        description: ['']
      });
    }

    onSubmit() {
      console.log(this.listingForm.value);
    }
}
