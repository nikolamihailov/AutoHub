import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormHelper } from '../../../../shared/form-helper';
import { FormErrMessagesComponent } from '../../../../shared/components';
import { AccountType } from '../../../../models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink, FormErrMessagesComponent, MatIconModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  private fb = inject(FormBuilder);
  protected formHelper = FormHelper;
  protected registerForm: FormGroup;

  protected accountTypes = [
    { value: AccountType.PRIVATE_ACCOUNT, label: 'Private Account' },
    { value: AccountType.DEALERSHIP, label: 'Dealership' },
  ];

  protected showPassword = false;
  protected showAccountInfo = false;

  constructor() {
    this.registerForm = this.fb.group({
      firstName: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      lastName: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(7),
        Validators.maxLength(25),
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      accounType: this.fb.nonNullable.control('', [Validators.required]),
    });
  }

  toggleShowInfoBtn() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  togglePassVisibility() {
    this.showPassword = !this.showPassword;
  }

  isValid = (field: string) => FormHelper.isValid(this.registerForm, field);
  isInvalid = (field: string) => FormHelper.isInvalid(this.registerForm, field);
  getErrorKeys = (field: string) => FormHelper.getErrorKeys(this.registerForm, field);

  errorMessages: Record<string, Record<string, string>> = {
    firstName: {
      required: 'First name is required.',
      minlength: 'First name must be at least 3 characters.',
      maxlength: 'First name must not be more than 15 characters.',
    },
    lastName: {
      required: 'Last name is required.',
      minlength: 'Last name must be at least 3 characters.',
      maxlength: 'Last name must not be more than 15 characters.',
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email.',
      minlength: 'Email must be at least 7 characters.',
      maxlength: 'Email must not be more than 25 characters.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters.',
      maxlength: 'Password must not be more than 20 characters.',
    },
    accounType: {
      required: 'Account type is required.',
    },
  };

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Submit logic here
      console.log(this.registerForm.value);
    } else {
      // Mark all fields as touched to show validation
      this.registerForm.markAllAsTouched();
    }
  }
}
