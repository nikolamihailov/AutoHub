import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormHelper } from '../../../../shared/utils';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services';
import { FormErrMessagesComponent } from '../../../../shared/components';
import { FORM_ERROR_MESSAGES } from '../../../../shared/constants';
import { AccountType, User, UserAuthErr, UserAuthResponse } from '../../../../models';

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
  private destroyRef = inject(DestroyRef);
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
      accountType: this.fb.nonNullable.control('', [Validators.required]),
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

    const { firstName, lastName, email, password, accountType } = this.registerForm.value;

    const userData: Partial<User> = {
      firstName,
      lastName,
      email,
      password,
      accountType,
    };

    this.authService
      .registerUser(userData)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
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
