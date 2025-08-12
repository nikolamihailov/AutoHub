import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffersSaved } from './car-offers-saved';

describe('CarOffersSaved', () => {
  let component: CarOffersSaved;
  let fixture: ComponentFixture<CarOffersSaved>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffersSaved]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffersSaved);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
