import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditForm } from './category-edit-form';

describe('CategoryEditForm', () => {
  let component: CategoryEditForm;
  let fixture: ComponentFixture<CategoryEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryEditForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
