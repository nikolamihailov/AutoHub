import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfferContainer } from './car-offer-container';

describe('CarOfferContainer', () => {
  let component: CarOfferContainer;
  let fixture: ComponentFixture<CarOfferContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOfferContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOfferContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
