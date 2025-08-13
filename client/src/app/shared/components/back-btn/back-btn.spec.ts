import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackBtn } from './back-btn';

describe('BackBtn', () => {
  let component: BackBtn;
  let fixture: ComponentFixture<BackBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
