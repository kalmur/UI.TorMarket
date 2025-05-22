import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingReviewListComponent } from './listing-review-list.component';

describe('ListingReviewListComponent', () => {
  let component: ListingReviewListComponent;
  let fixture: ComponentFixture<ListingReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingReviewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
