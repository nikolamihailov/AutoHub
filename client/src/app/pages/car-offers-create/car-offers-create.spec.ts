import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffersCreate } from './car-offers-create';

describe('CarOffersCreate', () => {
  let component: CarOffersCreate;
  let fixture: ComponentFixture<CarOffersCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffersCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffersCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
