import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ICreateListingRequest, ICreateListingFormDetails } from '../../models/listings';
import { ListingService } from '../../services/listing.service';
import { ToastrService } from 'ngx-toastr';
import { ListingCategoryService } from '../../../categories/services/listing-category.service';
import { ICategory } from '../../../../core/models/categories';
import { AuthHelperService } from '../../../../core/auth/services/auth-helper.service';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

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
export class ListingFormComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authHelperService: AuthHelperService = inject(AuthHelperService);
  private readonly userService: UserService = inject(UserService);
  private readonly productService: ListingService = inject(ListingService);
  private readonly listingCategoryService: ListingCategoryService = inject(ListingCategoryService);
  private readonly router: Router = inject(Router);
  private readonly toastr: ToastrService = inject(ToastrService);

  categories = model<ICategory[]>([]);
  listingChange = output<ICreateListingFormDetails>();

  listingFormGroup: FormGroup;

  constructor() {
    this.listingFormGroup = this.initializeForm();
  }

  ngOnInit(): void {
    this.subscribeToFormChanges();
    this.fetchAllCategories();
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
      availableFrom: ['', Validators.required],
      description: [''],
      imageUrl: ['']
    });
  }
  
  // Continously listening to form changes would not work with Promises
  private subscribeToFormChanges(): void {
    this.listingFormGroup.valueChanges.subscribe(value => {
      this.listingChange.emit(value);
    });
  }

  private async fetchAllCategories(): Promise<void> {
    const categories = await this.listingCategoryService.getAllListingCategories();
    this.categories.set(categories);
  }

  private async createListing(): Promise<void> {
    const userId = await this.fetchUserId();

    const selectedCategoryId = this.categories().find(category => 
      category.name === this.listingFormGroup.value.category
    )!.categoryId;

    const listing: ICreateListingRequest = {
      userId: userId,
      name: this.listingFormGroup.value.name,
      categoryId: selectedCategoryId,
      price: this.listingFormGroup.value.price,
      description: this.listingFormGroup.value.description,
      availableFrom: this.listingFormGroup.value.availableFrom
    };

    await this.productService.createListing(listing);
    this.router.navigate(['/']);
  }

  private async fetchUserId(): Promise<number> {
    const user = this.authHelperService.user();
    if (user && user.sub) {
        const dbUser = await this.userService.getUserByProviderId(user.sub);
        return dbUser.userId;
    } else {
      throw new Error('User not found or invalid');
    }
  }
}