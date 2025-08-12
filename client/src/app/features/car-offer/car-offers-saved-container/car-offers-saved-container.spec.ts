import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffersSavedContainer } from './car-offers-saved-container';

describe('CarOffersSavedContainer', () => {
  let component: CarOffersSavedContainer;
  let fixture: ComponentFixture<CarOffersSavedContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffersSavedContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffersSavedContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
