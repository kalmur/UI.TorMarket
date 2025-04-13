import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ICreateListingRequest, IListingFormDetails } from '../../models/listings';
import { ListingService } from '../../services/listing.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ListingCategoryService } from '../../../categories/services/listing-category.service';
import { ICategory } from '../../../../core/models/categories';

@Component({
  selector: 'app-listing-form',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    BsDropdownModule
  ],
  templateUrl: './listing-form.component.html',
  styleUrl: './listing-form.component.scss'
})
export class ListingFormComponent implements OnDestroy{
  private destroy$ = new Subject<void>();

  @Output() listingChange = new EventEmitter<IListingFormDetails>();

  listingFormGroup: FormGroup;
  categories: ICategory[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly productService: ListingService,
    private readonly listingCategoryService: ListingCategoryService,
    private readonly toastr: ToastrService
  ) {
    this.listingFormGroup = this.initializeForm();
    this.subscribeToFormChanges();
    this.fetchAllCategories();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if(this.listingFormGroup.valid) {
      this.createProduct();
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      availableFrom: [''],
      description: [''],
      imageUrl: ['']
    });
  }
  
  private subscribeToFormChanges(): void {
    this.listingFormGroup.valueChanges.subscribe(value => {
      this.listingChange.emit(value);
    });
  }

  private fetchAllCategories(): void {
      this.listingCategoryService.getAllProductCategories().subscribe({
        next: (response: ICategory[]) => {
          this.categories = response;
        },
        error: (error) => {
          console.error('Failed to fetch categories:', error);
        }
      }
    );
  }

  private createProduct() {
    console.log('Starting request');

    const product: ICreateListingRequest = {
      userId: this.listingFormGroup.value.userId,
      name: this.listingFormGroup.value.name,
      // fEtch from db
      categoryId: 1,
      price: this.listingFormGroup.value.price,
      description: this.listingFormGroup.value.description,
      availableFrom: this.listingFormGroup.value.availableFrom
    };

    this.productService.createListing(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
