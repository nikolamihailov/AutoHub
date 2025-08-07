import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesEdit } from './admin-categories-edit';

describe('AdminCategoriesEdit', () => {
  let component: AdminCategoriesEdit;
  let fixture: ComponentFixture<AdminCategoriesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoriesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
