import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffersEdit } from './car-offers-edit';

describe('CarOffersEdit', () => {
  let component: CarOffersEdit;
  let fixture: ComponentFixture<CarOffersEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffersEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffersEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
