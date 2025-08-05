import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditForm } from './profile-edit-form';

describe('ProfileEitForm', () => {
  let component: ProfileEditForm;
  let fixture: ComponentFixture<ProfileEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEditForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
