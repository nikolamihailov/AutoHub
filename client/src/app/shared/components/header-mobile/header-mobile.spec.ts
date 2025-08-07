import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobile } from './header-mobile';

describe('HeaderMobile', () => {
  let component: HeaderMobile;
  let fixture: ComponentFixture<HeaderMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
