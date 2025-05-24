import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlistingReviewFormComponent } from './listing-review-form.component';

describe('LlistingReviewFormComponent', () => {
  let component: LlistingReviewFormComponent;
  let fixture: ComponentFixture<LlistingReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistingReviewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlistingReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
