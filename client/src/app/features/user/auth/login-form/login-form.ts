import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '../../../../shared/form-helper';
import { FormErrMessagesComponent } from '../../../../shared/components';
import { AuthService } from '../../../../core/services/user/authService.service';
import { UserAuthErr, UserAuthResponse } from '../../../../models';
import { FORM_ERROR_MESSAGES } from '../../../../shared/constants/formErrMessages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormErrMessagesComponent,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  protected formHelper = FormHelper;
  protected loginForm: FormGroup;

  protected showPassword = false;
  protected invalidFields = false;
  protected isLoading = false;

  errorMessages = FORM_ERROR_MESSAGES['loginForm'];
  isValid = (field: string) => FormHelper.isValid(this.loginForm, field);
  isInvalid = (field: string) => FormHelper.isInvalid(this.loginForm, field);
  getErrorKeys = (field: string) => FormHelper.getErrorKeys(this.loginForm, field);

  constructor() {
    this.loginForm = this.fb.group({
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  togglePassVisibility() {
    this.showPassword = !this.showPassword;
  }

  resetInvalidFields() {
    if (this.invalidFields) {
      this.invalidFields = false;
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response: UserAuthResponse) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
        this.toast.success('Successful Login!');
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
          this.invalidFields = true;
          this.toast.error('Invalid email or password');
        } else {
          this.toast.error(errMsg);
        }

        return;
      },
    });
  }
}
