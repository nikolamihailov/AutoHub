import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '../../../../shared/form-helper';
import { FormErrMessagesComponent } from '../../../../shared/components';
import { AuthService } from '../../../../core/services/user/authService.service';
import { UserAuthErr, UserAuthResponse } from '../../../../models';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink, FormErrMessagesComponent, MatIconModule],
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

  isValid = (field: string) => FormHelper.isValid(this.loginForm, field);
  isInvalid = (field: string) => FormHelper.isInvalid(this.loginForm, field);
  getErrorKeys = (field: string) => FormHelper.getErrorKeys(this.loginForm, field);

  constructor() {
    this.loginForm = this.fb.group({
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  errorMessages: Record<string, Record<string, string>> = {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters.',
    },
  };

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

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response: UserAuthResponse) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
        this.toast.success('Successful Login!');
      },
      error: (err: UserAuthErr) => {
        const errMsg = err.error.errors[0];
        if (errMsg) {
          this.invalidFields = true;
          this.toast.error('Invalid email or password!');
        }
        return;
      },
    });
  }
}
