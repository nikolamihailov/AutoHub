import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCarOffers } from './my-car-offers';

describe('MyCarOffers', () => {
  let component: MyCarOffers;
  let fixture: ComponentFixture<MyCarOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCarOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCarOffers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
