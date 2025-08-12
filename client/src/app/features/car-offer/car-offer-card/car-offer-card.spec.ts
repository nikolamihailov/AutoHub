import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfferCard } from './car-offer-card';

describe('CarOfferCard', () => {
  let component: CarOfferCard;
  let fixture: ComponentFixture<CarOfferCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOfferCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOfferCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
