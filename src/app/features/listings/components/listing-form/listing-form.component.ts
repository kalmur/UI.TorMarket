import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ICreateListingRequest, IListingFormDetails } from '../../models/listings';
import { ListingService } from '../../services/listing.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ListingCategoryService } from '../../../categories/services/listing-category.service';
import { ICategory } from '../../../../core/models/categories';
import { AuthHelperService } from '../../../../core/auth/services/auth-helper.service';
import { UserService } from '../../../../core/services/user.service';
import { IDatabaseUser } from '../../../../core/models/user';

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
export class ListingFormComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  @Output() listingChange = new EventEmitter<IListingFormDetails>();

  listingFormGroup: FormGroup;
  categories: ICategory[] = [];

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authHelperService: AuthHelperService = inject(AuthHelperService);
  private readonly userService: UserService = inject(UserService);
  private readonly productService: ListingService = inject(ListingService);
  private readonly listingCategoryService: ListingCategoryService = inject(ListingCategoryService);
  private readonly toastr: ToastrService = inject(ToastrService);

  constructor() {
    this.listingFormGroup = this.initializeForm();
  }

  ngOnInit(): void {
    this.subscribeToFormChanges();
    this.fetchAllCategories();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if(this.listingFormGroup.valid) {
      this.createListing();
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  setCategory(categoryName: string): void {
    this.listingFormGroup.controls['category'].setValue(categoryName);
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

  private createListing(): void {
    this.fetchUserId().subscribe({
      next: (userId) => {
        const listing: ICreateListingRequest = {
          userId: userId,
          name: this.listingFormGroup.value.name,
          categoryId: 1,
          price: this.listingFormGroup.value.price,
          description: this.listingFormGroup.value.description,
          availableFrom: this.listingFormGroup.value.availableFrom
        };

        console.log(listing);
  
        this.productService.createListing(listing).subscribe({
          next: () => {
            this.toastr.success('Product created successfully');
          },
          error: () => {
            this.toastr.error('Failed to create product');
          }
        });
      },
      error: () => {
        this.toastr.error('Failed to fetch user information');
      }
    });
  }

  private fetchUserId(): Observable<number> {
    return new Observable<number>((observer) => {
      this.authHelperService.user$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (user) => {
          if (user && user.sub) {
            this.userService.getUserByProviderId(user.sub).subscribe({
              next: (dbUser: IDatabaseUser) => {
                observer.next(dbUser.userId);
                observer.complete();
              }
            });
          }
        }
      });
    });
  }
}