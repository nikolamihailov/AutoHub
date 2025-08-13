import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CarOfferService, AuthService, UserService } from '../../../core/services';
import { AccountType, CarOfferDetails } from '../../../models';

@Component({
  selector: 'app-car-offer-details-container',
  imports: [MatProgressSpinnerModule, DatePipe, MatIconModule, RouterLink],
  templateUrl: './car-offer-details-container.html',
  styleUrl: './car-offer-details-container.scss',
})
export class CarOfferDetailsContainer {
  private carOffersService = inject(CarOfferService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  protected carOffer: CarOfferDetails | null = null;
  protected isLoading = true;
  protected errorMsg: string | null = null;
  protected selectedImage: string | null = null;

  protected isSaved = false;
  protected isSaving = false;

  protected isLoggedIn = this.authService.isLoggedIn;
  protected currentUser = this.authService.currentUser;

  protected AccountType = AccountType;
  protected accountTypes = {
    [AccountType.DEALERSHIP]: 'Dealership',
    [AccountType.PRIVATE_ACCOUNT]: 'Private',
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.carOffersService
      .getCarOffer(id)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (car: CarOfferDetails) => {
          this.carOffer = car;
          this.selectedImage = car.mainImage;

          if (this.currentUser()) {
            this.userService.getUserInfo().subscribe((user) => {
              if (user.savedCarOffers.some((offer) => offer?._id === car._id)) {
                this.isSaved = true;
              }
            });
          }
        },
        error: () => {
          this.errorMsg = 'Failed to load car offer.';
        },
      });
  }

  toggleSave(): void {
    if (!this.carOffer?._id) return;

    this.isSaving = true;

    if (this.carOffer?.creator._id === this.currentUser()?._id) {
      this.toast.warning('You cannot save your own offer.');
      return;
    }

    const action$ = this.isSaved
      ? this.userService.removeCarOfferFromSaved(this.carOffer._id)
      : this.userService.addCarOfferToSaved(this.carOffer._id);

    action$.pipe(finalize(() => (this.isSaving = false))).subscribe({
      next: () => {
        this.isSaved = !this.isSaved;
        this.toast.success(
          this.isSaved ? 'Car offer added to saved!' : 'Car offer removed from saved!',
        );
      },
      error: () => {
        this.toast.error('Failed to update saved');
      },
    });
  }
}
