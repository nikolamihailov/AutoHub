import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfferDetails } from './car-offer-details';

describe('CarOfferDetails', () => {
  let component: CarOfferDetails;
  let fixture: ComponentFixture<CarOfferDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOfferDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOfferDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
