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
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../models';

@Component({
  selector: 'app-category-edit',
  imports: [ReactiveFormsModule, MatIconModule, MatProgressSpinnerModule, FormErrMessagesComponent],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.scss',
})
export class CategoryEdit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  protected editForm: FormGroup = this.fb.group({
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

  isValid = (field: string) => FormHelper.isValid(this.editForm, field);
  isInvalid = (field: string) => FormHelper.isInvalid(this.editForm, field);

  categoryImageInput!: HTMLInputElement;

  categoryId!: string;

  ngAfterViewInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.categoryService
      .getCategory(this.categoryId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (category: Category) => {
          this.editForm.patchValue({
            name: category.name,
            img: null,
          });
          this.categoryPreview = category.categoryImage || null;

          const imgCtrl = this.editForm.get('img');
          if (this.categoryPreview) {
            imgCtrl?.clearValidators();
            imgCtrl?.setErrors(null);
            imgCtrl?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
          } else {
            imgCtrl?.setValidators([Validators.required]);
            imgCtrl?.setErrors({ required: true });
            imgCtrl?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
            return;
          }
          this.errorMsg = err?.error?.message || 'Failed to load category.';
        },
      });
  }

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
        this.editForm.get('img')?.setValue(compressedFile);
        this.editForm.get('img')?.markAsDirty();
      } catch (err) {
        this.toast.error('Failed to process image');
      }
    }
  }

  removeCategoryImage() {
    this.categoryPreview = null;
    this.categoryImageFile = null;
    this.editForm.get('img')?.setValue(null);
    this.editForm.get('img')?.setValidators([Validators.required]);
    this.editForm.get('img')?.updateValueAndValidity();
    this.editForm.get('img')?.markAsDirty();
  }

  onSubmit() {
    if (this.editForm.invalid) return;

    this.isLoading = true;
    const { name } = this.editForm.value;

    const categoryData = {
      name,
      categoryImage: this.categoryPreview ?? undefined,
    };

    this.categoryService
      .updateCategory(this.categoryId, categoryData)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.toast.success('Category updated!');
          this.router.navigate(['/admin-dashboard/categories']);
          this.editForm.reset();
          this.categoryPreview = null;
          this.categoryImageFile = null;
        },
        error: (err) => {
          this.toast.error('Failed to update category');
          this.errorMsg = err?.error?.message || 'Error occurred';
        },
      });
  }
}
