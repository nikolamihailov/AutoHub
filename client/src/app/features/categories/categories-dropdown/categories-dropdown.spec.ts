import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDropdown } from './categories-dropdown';

describe('CategoriesDropdown', () => {
  let component: CategoriesDropdown;
  let fixture: ComponentFixture<CategoriesDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
