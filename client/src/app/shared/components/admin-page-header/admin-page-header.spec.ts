import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageHeader } from './admin-page-header';

describe('AdminPageHeader', () => {
  let component: AdminPageHeader;
  let fixture: ComponentFixture<AdminPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
