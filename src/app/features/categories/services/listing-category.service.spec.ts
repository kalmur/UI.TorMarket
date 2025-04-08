import { TestBed } from '@angular/core/testing';

import { ListingCategoryService } from './listing-category.service';

describe('ListingCategoryService', () => {
  let service: ListingCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
