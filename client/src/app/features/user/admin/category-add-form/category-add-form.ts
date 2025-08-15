import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormErrMessagesComponent } from '../../../../shared/components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import imageCompression from 'browser-image-compression';
import { AuthService, CategoryService } from '../../../../core/services';
import { FormHelper } from '../../../../shared/utils';
import { FORM_ERROR_MESSAGES } from '../../../../shared/constants';

@Component({
  selector: 'app-category-add-form',
  imports: [ReactiveFormsModule, MatIconModule, MatProgressSpinnerModule, FormErrMessagesComponent],
  templateUrl: './category-add-form.html',
  styleUrl: './category-add-form.scss',
})
export class CategoryAddForm {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  protected addForm: FormGroup = this.fb.group({
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    img: this.fb.control(null, [Validators.required]),
  });

  protected categoryPreview: string | null = null;
  protected categoryImageFile: File | null = null;
  protected isLoading = false;
  protected errorMsg: string | null = null;

  errorMessages = FORM_ERROR_MESSAGES['categoryForm'];

  isValid = (field: string) => FormHelper.isValid(this.addForm, field);
  isInvalid = (field: string) => FormHelper.isInvalid(this.addForm, field);

  categoryImageInput!: HTMLInputElement;

  async onCategoryImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      try {
        const compressedFile = await imageCompression(file, { maxSizeMB: 0.5 });
        const reader = new FileReader();
        reader.onload = (e) => {
          this.categoryPreview = e.target?.result as string;
        };
        reader.readAsDataURL(compressedFile);

        this.categoryImageFile = compressedFile;
        this.addForm.get('img')?.setValue(compressedFile);
        this.addForm.get('img')?.markAsDirty();
      } catch (err) {
        this.toast.error('Failed to process image');
      }
    }
  }

  removeCategoryImage() {
    this.categoryPreview = null;
    this.categoryImageFile = null;
    this.addForm.get('img')?.setValue(null);
    this.addForm.get('img')?.markAsDirty();
  }

  onSubmit() {
    if (this.addForm.invalid) return;

    this.isLoading = true;
    const { name } = this.addForm.value;

    const categoryData = {
      name,
      categoryImage: this.categoryPreview ?? undefined,
    };

    this.categoryService
      .createCategory(categoryData)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.toast.success('Category added!');
          this.router.navigate(['/admin-dashboard/categories']);
          this.addForm.reset();
          this.categoryPreview = null;
          this.categoryImageFile = null;
        },
        error: (err) => {
          if (err.status === 401) {
            this.handleExpiredSession();
            return;
          }
          this.toast.error('Failed to add category');
          this.errorMsg = err?.error?.message || 'Error occurred';
        },
      });
  }

  handleExpiredSession() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toast.error('Your session has expired! Please login');
  }
}
