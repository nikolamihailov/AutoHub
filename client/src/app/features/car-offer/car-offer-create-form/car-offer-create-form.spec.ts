import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfferCreateForm } from './car-offer-create-form';

describe('CarOfferCreateForm', () => {
  let component: CarOfferCreateForm;
  let fixture: ComponentFixture<CarOfferCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOfferCreateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOfferCreateForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
