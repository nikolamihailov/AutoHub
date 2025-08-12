import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffers } from './car-offers';

describe('CarOffers', () => {
  let component: CarOffers;
  let fixture: ComponentFixture<CarOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
