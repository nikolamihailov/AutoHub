import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffersManagement } from './car-offers-management';

describe('CarOffersManagement', () => {
  let component: CarOffersManagement;
  let fixture: ComponentFixture<CarOffersManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffersManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffersManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
