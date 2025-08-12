import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfferDetailsContainer } from './car-offer-details-container';

describe('CarOfferDetailsContainer', () => {
  let component: CarOfferDetailsContainer;
  let fixture: ComponentFixture<CarOfferDetailsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOfferDetailsContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOfferDetailsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
