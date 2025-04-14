import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedListingsComponent } from './searched-listings.component';

describe('SearchedListingsComponent', () => {
  let component: SearchedListingsComponent;
  let fixture: ComponentFixture<SearchedListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
