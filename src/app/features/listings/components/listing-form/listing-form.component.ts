import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CreateListingRequest, CreateListingFormDetails, CreateListingResponse } from '../../models/listings';
import { ListingService } from '../../services/listing.service';
import { ToastrService } from 'ngx-toastr';
import { ListingCategoryService } from '../../../categories/services/listing-category.service';
import { Category } from '../../../../core/models/categories';
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
  private readonly userService: UserService = inject(UserService);
  private readonly listingService: ListingService = inject(ListingService);
  private readonly listingCategoryService: ListingCategoryService = inject(ListingCategoryService);
  private readonly router: Router = inject(Router);
  private readonly toastr: ToastrService = inject(ToastrService);

  categories = model<Category[]>([]);
  listingChange = output<CreateListingFormDetails>();
  selectedFile = signal<File | null>(null);
  imagePreviewUrlChange = output<string | null>();

  listingFormGroup: FormGroup;

  constructor() {
    this.listingFormGroup = this.initializeForm();
  }

  ngOnInit(): void {
    this.subscribeToFormChanges();
    this.fetchAllCategories();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrlChange.emit(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.listingFormGroup.valid) {
      const createdListing = await this.createListing();

      if (this.selectedFile()) {
        await this.uploadAndAttachBlob(
          createdListing.listingId, 
          this.selectedFile()!
        );
      }
      
      this.router.navigate(['/']);
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  setCategory(categoryName: string): void {
    this.listingFormGroup.controls['category'].setValue(categoryName);
  }

  // Private methods
  
  private initializeForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['']
    });
  }
  
  private subscribeToFormChanges(): void {
    this.listingFormGroup.valueChanges.subscribe(value => {
      this.listingChange.emit(value);
    });
  }

  private async fetchAllCategories(): Promise<void> {
    const categories = await this.listingCategoryService.getAllListingCategories();
    this.categories.set(categories);
  }

  private async createListing(): Promise<CreateListingResponse> {
    const userId = await this.userService.fetchUserId();

    // TODO - Down the line, we should be fetching by categoryName
    const selectedCategoryId = this.categories().find(category => 
      category.name === this.listingFormGroup.value.category
    )!.categoryId;

    const request: CreateListingRequest = {
      userId: userId,
      name: this.listingFormGroup.value.name,
      categoryId: selectedCategoryId,
      price: this.listingFormGroup.value.price,
      description: this.listingFormGroup.value.description
    };

    return await this.listingService.createListing(request);
  }

  private async uploadAndAttachBlob(listingId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const blobUrl = await this.listingService.uploadFileToBlob(formData);

    await this.listingService.updateListingBlobUrls(
      listingId,
      blobUrl
    );
  }
}