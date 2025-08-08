import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormErrMessagesComponent } from '../../../shared/components';
import { CategoryService } from '../../../core/services/categoryService.service';
import { FORM_ERROR_MESSAGES } from '../../../shared/constants/formErrMessages';
import { FormHelper } from '../../../shared/form-helper';
import { CarOfferService } from '../../../core/services/carOfferService.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/user/authService.service';
import { CarOffer, Gearbox } from '../../../models';

@Component({
  selector: 'app-car-offer-create-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormErrMessagesComponent,
  ],
  templateUrl: './car-offer-create-form.html',
  styleUrl: './car-offer-create-form.scss',
})
export class CarOfferCreateForm implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private categoryService = inject(CategoryService);
  private carOfferService = inject(CarOfferService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  isLoading = false;
  categories: Array<{ _id: string; name: string }> = [];

  errorMessages = FORM_ERROR_MESSAGES['carOfferForm'];

  private imgUrlRe = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))(?:\?.*)?$/i;

  protected carOfferForm = this.fb.group({
    brand: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(32),
    ]),
    model: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(32),
    ]),
    price: this.fb.nonNullable.control(0, [Validators.required, Validators.min(1)]),
    year: this.fb.nonNullable.control(new Date().getFullYear(), [
      Validators.required,
      Validators.min(1920),
    ]),
    mileage: this.fb.nonNullable.control(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(1_000_000),
    ]),
    region: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64),
    ]),
    gearbox: this.fb.nonNullable.control<Gearbox>(Gearbox.MANUAL, [Validators.required]),
    category: this.fb.nonNullable.control('', [Validators.required]),
    description: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1500),
    ]),
    mainImage: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(this.imgUrlRe),
    ]),
    images: this.fb.array<FormControl<string>>([]),
  });

  newImageUrl = this.fb.nonNullable.control('', []);

  get images(): FormArray<FormControl<string>> {
    return this.carOfferForm.get('images') as FormArray<FormControl<string>>;
  }

  isValid = (f: string) => FormHelper.isValid(this.carOfferForm, f);
  isInvalid = (f: string) => FormHelper.isInvalid(this.carOfferForm, f);

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (cats) => (this.categories = cats ?? []),
      error: () => this.toast.error('Could not load categories'),
    });
  }

  addImageUrl() {
    const url = this.newImageUrl.value.trim();
    if (!url) return;
    if (!this.imgUrlRe.test(url)) {
      this.toast.error('Please enter a valid image URL');
      return;
    }
    this.images.push(this.fb.nonNullable.control(url, [Validators.pattern(this.imgUrlRe)]));
    this.newImageUrl.reset('');
  }

  removeImage(i: number) {
    this.images.removeAt(i);
  }

  onSubmit() {
    if (this.carOfferForm.invalid) return;

    this.isLoading = true;
    const formValue = this.carOfferForm.getRawValue();

    const carOfferData: Omit<CarOffer, '_id'> = {
      ...formValue,
      creator: this.authService.currentUser()!._id,
    };

    this.carOfferService
      .createCategory(carOfferData)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.toast.success('Car Offer created!');
          // this.router.navigate(['/car-offers']);
          this.carOfferForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.toast.error('Failed to add category');
        },
      });
  }
}
