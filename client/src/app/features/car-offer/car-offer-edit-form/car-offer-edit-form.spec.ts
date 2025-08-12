import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfferEditForm } from './car-offer-edit-form';

describe('CarOfferEditForm', () => {
  let component: CarOfferEditForm;
  let fixture: ComponentFixture<CarOfferEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOfferEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOfferEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
