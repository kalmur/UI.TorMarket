import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categories } from '../../../shared/enums/categories';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Output() productChange = new EventEmitter<any>();

  productFormGroup: FormGroup;
  categories = Object.values(Categories);

  constructor(private fb: FormBuilder) {
    this.productFormGroup = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      availableFrom: [''],
      description: [''],
      imageUrl: ['']
    });

    console.log('Form initialized:', this.productFormGroup);

    this.productFormGroup.valueChanges.subscribe(value => {
      console.log('Form value changed:', value);
      this.productChange.emit(value);
    });
  }

  onSubmit() {
    console.log(this.productFormGroup.value);
  }
}
