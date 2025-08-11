import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormErrMessagesComponent } from '../../../shared/components';
import { FormHelper } from '../../../shared/form-helper';
import { AccountType, User } from '../../../models';
import { FORM_ERROR_MESSAGES } from '../../../shared/constants/formErrMessages';
import imageCompression from 'browser-image-compression';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-profile-edit-form',
  imports: [
    ReactiveFormsModule,
    FormErrMessagesComponent,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './profile-edit-form.html',
  styleUrl: './profile-edit-form.scss',
})
export class ProfileEditForm implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private destroyRef = inject(DestroyRef);

  protected formHelper = FormHelper;
  protected editForm!: FormGroup;
  protected isLoading = true;
  protected errorMsg: string | null = null;
  protected avatarPreview: string | null = null;
  protected avatarFile: File | null = null;

  protected accountTypes = [
    { value: AccountType.PRIVATE_ACCOUNT, label: 'Private Account' },
    { value: AccountType.DEALERSHIP, label: 'Dealership' },
  ];

  errorMessages = FORM_ERROR_MESSAGES['registerForm'];
  isValid = (field: string) => FormHelper.isValid(this.editForm, field);
  isInvalid = (field: string) => FormHelper.isInvalid(this.editForm, field);
  getErrorKeys = (field: string) => FormHelper.getErrorKeys(this.editForm, field);

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
      next: (user: User) => {
        this.editForm = this.fb.group({
          firstName: this.fb.nonNullable.control(user.firstName, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ]),
          lastName: this.fb.nonNullable.control(user.lastName, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ]),
          accountType: this.fb.nonNullable.control(user.accountType, [Validators.required]),
        });
        this.avatarPreview = user.avatar || null;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load profile info.';
        this.isLoading = false;
      },
    });
  }

  async onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      const compressedFile = await imageCompression(file, { maxSizeMB: 0.5 });

      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target?.result as string;
      };
      reader.readAsDataURL(compressedFile);

      this.avatarFile = compressedFile;
    }
  }

  removeAvatar() {
    this.avatarPreview = null;
    this.avatarFile = null;
  }

  onSubmit() {
    if (this.editForm.invalid) return;

    this.isLoading = true;
    const { firstName, lastName, accountType } = this.editForm.value;

    const userData = {
      firstName,
      lastName,
      accountType,
      avatar: this.avatarPreview ?? undefined,
    };

    this.userService
      .updateProfile(userData)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.toast.success('Profile updated!');
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.log(err);
          this.toast.error('Failed to update profile');
        },
      });
  }
}
