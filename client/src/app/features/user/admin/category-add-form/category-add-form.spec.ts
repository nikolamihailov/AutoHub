import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddForm } from './category-add-form';

describe('CategoryAddForm', () => {
  let component: CategoryAddForm;
  let fixture: ComponentFixture<CategoryAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAddForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryAddForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
