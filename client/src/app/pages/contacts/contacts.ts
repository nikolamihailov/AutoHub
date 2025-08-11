import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '../../shared/form-helper';
import { FORM_ERROR_MESSAGES } from '../../shared/constants/formErrMessages';
import { FormErrMessagesComponent } from '../../shared/components';

@Component({
  selector: 'app-contacts',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormErrMessagesComponent,
  ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);
  protected formHelper = FormHelper;
  protected contactsForm: FormGroup;

  protected isLoading = false;

  isValid = (field: string) => FormHelper.isValid(this.contactsForm, field);
  isInvalid = (field: string) => FormHelper.isInvalid(this.contactsForm, field);
  getErrorKeys = (field: string) => FormHelper.getErrorKeys(this.contactsForm, field);

  errorMessages = FORM_ERROR_MESSAGES['contactsForm'];

  constructor() {
    this.contactsForm = this.fb.group({
      name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      message: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(10)]),
    });
  }

  onSubmit() {
    if (this.contactsForm.invalid) {
      this.contactsForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.toast.success('Message sent! We’ll get back to you soon.');
      this.contactsForm.reset();
    }, 1000);
  }
}
