import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffersForUser } from './car-offers-for-user';

describe('CarOffersForUser', () => {
  let component: CarOffersForUser;
  let fixture: ComponentFixture<CarOffersForUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffersForUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffersForUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
