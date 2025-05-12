import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingReviewCardComponent } from './listing-review-card.component';

describe('ListingReviewCardComponent', () => {
  let component: ListingReviewCardComponent;
  let fixture: ComponentFixture<ListingReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingReviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
