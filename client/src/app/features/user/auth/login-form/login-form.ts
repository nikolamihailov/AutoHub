import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '../../../../shared/form-helper';
import { FormErrMessagesComponent } from '../../../../shared/components';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink, FormErrMessagesComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);
  protected formHelper = FormHelper;
  protected loginForm: FormGroup;

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

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.toast.success('Stana mai');
    } else {
    }
  }
}
