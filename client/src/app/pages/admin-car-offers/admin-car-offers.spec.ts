import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarOffers } from './admin-car-offers';

describe('AdminCarOffers', () => {
  let component: AdminCarOffers;
  let fixture: ComponentFixture<AdminCarOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCarOffers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
