import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffersLatest } from './car-offers-latest';

describe('CarOffersLatest', () => {
  let component: CarOffersLatest;
  let fixture: ComponentFixture<CarOffersLatest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffersLatest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffersLatest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
