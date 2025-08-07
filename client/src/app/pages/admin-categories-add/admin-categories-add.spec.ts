import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesAdd } from './admin-categories-add';

describe('AdminCategoriesAdd', () => {
  let component: AdminCategoriesAdd;
  let fixture: ComponentFixture<AdminCategoriesAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoriesAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
