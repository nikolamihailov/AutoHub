import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormErrMessagesComponent } from '../../../../shared/components';
import { CategoryService } from '../../../../core/services/categoryService.service';
import { ToastrService } from 'ngx-toastr';
import { FORM_ERROR_MESSAGES } from '../../../../shared/constants/formErrMessages';
import { FormHelper } from '../../../../shared/form-helper';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import imageCompression from 'browser-image-compression';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  imports: [ReactiveFormsModule, MatIconModule, MatProgressSpinnerModule, FormErrMessagesComponent],
  templateUrl: './category-add.html',
  styleUrl: './category-add.scss',
})
export class CategoryAdd {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
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
          this.toast.error('Failed to add category');
          this.errorMsg = err?.error?.message || 'Error occurred';
        },
      });
  }
}
