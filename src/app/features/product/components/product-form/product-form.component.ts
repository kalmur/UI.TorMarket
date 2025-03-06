import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categories } from '../../../../shared/enums/categories';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ICreateProductRequest, IProductFormDetails } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    BsDropdownModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnDestroy{
  private destroy$ = new Subject<void>();

  @Output() productChange = new EventEmitter<IProductFormDetails>();

  productFormGroup: FormGroup;
  categories = Object.values(Categories);

  constructor(
    private fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly toastr: ToastrService
  ) {
    this.productFormGroup = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      availableFrom: [''],
      description: [''],
      imageUrl: ['']
    });

    this.productFormGroup.valueChanges.subscribe(value => {
      this.productChange.emit(value);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if(this.productFormGroup.valid) {
      this.createProduct();
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  private createProduct() {
    console.log('Starting request');

    const product: ICreateProductRequest = {
      userId: this.productFormGroup.value.userId,
      name: this.productFormGroup.value.name,
      // fEtch from db
      categoryId: 1,
      price: this.productFormGroup.value.price,
      description: this.productFormGroup.value.description,
      availableFrom: this.productFormGroup.value.availableFrom
    };

    this.productService.createProduct(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
