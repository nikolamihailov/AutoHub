import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormHelper } from '../../../../shared/form-helper';
import { FormErrMessagesComponent } from '../../../../shared/components';
import { AccountType, Role, User, UserAuthErr, UserAuthResponse } from '../../../../models';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/user/authService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink, FormErrMessagesComponent, MatIconModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  protected formHelper = FormHelper;
  protected registerForm: FormGroup;

  protected accountTypes = [
    { value: AccountType.PRIVATE_ACCOUNT, label: 'Private Account' },
    { value: AccountType.DEALERSHIP, label: 'Dealership' },
  ];

  protected showPassword = false;
  protected showAccountInfo = false;
  protected userAlreadyExists = false;

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

  resetUserAlreadyExists() {
    if (this.userAlreadyExists) {
      this.userAlreadyExists = false;
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { firstName, lastName, email, password, accounType } = this.registerForm.value;

    const userData: Partial<User> = {
      firstName,
      lastName,
      email,
      password,
      accounType,
      role: Role.USER,
    };

    this.authService.registerUser(userData).subscribe({
      next: (response: UserAuthResponse) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
        this.toast.success('Successfuly created new account!');
      },
      error: (err: UserAuthErr) => {
        const errMsg = err.error.errors[0];
        if (errMsg) {
          this.userAlreadyExists = true;
          this.toast.error('User with this email already exists!');
        }
        return;
      },
    });
  }
}
