import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormHelper } from '../../../../shared/form-helper';
import { FormErrMessagesComponent } from '../../../../shared/components';
import { AccountType, Role, User, UserAuthErr, UserAuthResponse } from '../../../../models';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/services/user/authService.service';
import { ToastrService } from 'ngx-toastr';
import { FORM_ERROR_MESSAGES } from '../../../../shared/constants/formErrMessages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormErrMessagesComponent,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
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
  protected isLoading = false;

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

  errorMessages = FORM_ERROR_MESSAGES['registerForm'];
  isValid = (field: string) => FormHelper.isValid(this.registerForm, field);
  isInvalid = (field: string) => FormHelper.isInvalid(this.registerForm, field);
  getErrorKeys = (field: string) => FormHelper.getErrorKeys(this.registerForm, field);

  resetUserAlreadyExists() {
    if (this.userAlreadyExists) {
      this.userAlreadyExists = false;
    }
  }

  toggleShowInfoBtn() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  togglePassVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.isLoading = true;

    const { firstName, lastName, email, password, accounType } = this.registerForm.value;

    const userData: Partial<User> = {
      firstName,
      lastName,
      email,
      password,
      accounType,
      avatar: '',
      role: Role.USER,
    };

    this.authService.registerUser(userData).subscribe({
      next: (response: UserAuthResponse) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
        this.toast.success('Successfuly created new account!');
        this.isLoading = false;
      },
      error: (err: UserAuthErr | HttpErrorResponse) => {
        this.isLoading = false;

        const errMsg =
          err?.error?.errors?.[0] ||
          (typeof err?.error === 'string' && err.error) ||
          err?.statusText ||
          'Unknown Error';

        if (err?.error?.errors?.[0]) {
          this.userAlreadyExists = true;
          this.toast.error('User with this email already exists!');
        } else {
          this.toast.error(errMsg);
        }

        return;
      },
    });
  }
}
