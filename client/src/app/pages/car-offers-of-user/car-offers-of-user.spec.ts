import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOffersOfUser } from './car-offers-of-user';

describe('CarOffersOfUser', () => {
  let component: CarOffersOfUser;
  let fixture: ComponentFixture<CarOffersOfUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOffersOfUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOffersOfUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
