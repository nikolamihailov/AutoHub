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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CarOfferService, CategoryService } from '../../../core/services';
import { FormErrMessagesComponent } from '../../../shared/components';
import { FormHelper } from '../../../shared/utils';
import { FORM_ERROR_MESSAGES } from '../../../shared/constants';
import { CarOffer, Category, Gearbox, Status } from '../../../models';

@Component({
  selector: 'app-car-offer-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormErrMessagesComponent,
  ],
  templateUrl: './car-offer-edit-form.html',
  styleUrl: './car-offer-edit-form.scss',
})
export class CarOfferEditForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private carOfferService = inject(CarOfferService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  protected isLoading = true;
  protected isSubmitting = false;
  protected categories: Array<{ _id: string; name: string }> = [];

  errorMessages = FORM_ERROR_MESSAGES['carOfferForm'];
  protected status = Status;
  protected imgUrlRe = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))(?:\?.*)?$/i;

  protected carOfferForm = this.fb.group({
    brand: this.fb.nonNullable.control<string>('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(32)],
    }),
    model: this.fb.nonNullable.control<string>('', {
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(32)],
    }),
    price: this.fb.nonNullable.control<number>(0, {
      validators: [Validators.required, Validators.min(1)],
    }),
    year: this.fb.nonNullable.control<number>(new Date().getFullYear(), {
      validators: [Validators.required, Validators.min(1920)],
    }),
    mileage: this.fb.nonNullable.control<number>(0, {
      validators: [Validators.required, Validators.min(0), Validators.max(1_000_000)],
    }),
    region: this.fb.nonNullable.control<string>('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
    }),
    gearbox: this.fb.nonNullable.control<Gearbox>(Gearbox.MANUAL, {
      validators: [Validators.required],
    }),
    status: this.fb.nonNullable.control<Status>(Status.ACTIVE, {
      validators: [Validators.required],
    }),
    category: this.fb.nonNullable.control<string>('', { validators: [Validators.required] }),
    description: this.fb.nonNullable.control<string>('', {
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1500)],
    }),
    mainImage: this.fb.nonNullable.control<string>('', {
      validators: [Validators.required, Validators.pattern(this.imgUrlRe)],
    }),
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

    const id = this.route.snapshot.paramMap.get('id')!;
    this.carOfferService
      .getCarOffer(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (offer) => this.populateForm(offer),
        error: (err) => {
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
            this.toast.error('No such car offer');
            return;
          }
          this.toast.error('Could not load car offer');
        },
      });
  }

  populateForm(offer: CarOffer) {
    this.carOfferForm.patchValue({
      brand: offer.brand,
      model: offer.model,
      price: offer.price,
      year: offer.year,
      mileage: offer.mileage,
      region: offer.region,
      gearbox: offer.gearbox,
      status: offer.status,
      category:
        typeof offer.category === 'object' ? (offer.category as Category)._id : offer.category,
      description: offer.description,
      mainImage: offer.mainImage,
    });
    this.images.clear();
    (offer.images ?? []).forEach((img) => {
      this.images.push(
        this.fb.nonNullable.control<string>(img, [Validators.pattern(this.imgUrlRe)]),
      );
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
    this.isSubmitting = true;

    const formValue = this.carOfferForm.getRawValue();
    const id = this.route.snapshot.paramMap.get('id')!;

    this.carOfferService
      .editCarOffer(id, formValue)
      .pipe(
        finalize(() => (this.isSubmitting = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.toast.success('Car Offer updated!');
          const returnTo = this.route.snapshot.queryParamMap.get('returnTo');
          this.router.navigateByUrl(returnTo ?? '/car-offers/mine');
          this.carOfferForm.reset();
        },
        error: (err) => {
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
            this.toast.error('No such car offer');
            return;
          }
          this.toast.error('Failed to update car offer');
        },
      });
  }
}
