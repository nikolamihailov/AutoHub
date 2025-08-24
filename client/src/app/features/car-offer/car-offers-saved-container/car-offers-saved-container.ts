import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserService } from '../../../core/services';
import { CarOfferCard } from '../car-offer-card/car-offer-card';
import { cardAnimation, listAnimation } from '../../../shared/constants';
import { CarOffer } from '../../../models';

@Component({
  selector: 'app-car-offers-saved-container',
  imports: [CarOfferCard, MatProgressSpinner, MatIconModule],
  templateUrl: './car-offers-saved-container.html',
  styleUrl: './car-offers-saved-container.scss',
  animations: [cardAnimation, listAnimation],
})
export class CarOffersSavedContainer {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private toast = inject(ToastrService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  protected savedOffers: CarOffer[] = [];
  protected isLoading = false;
  protected initialLoad = true;

  ngOnInit(): void {
    this.loadSavedOffers();
  }

  loadSavedOffers() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.initialLoad = false;

    this.userService
      .getSavedCarOffers()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: (offers) => {
          this.savedOffers = offers;
        },
        error: (err) => {
          if (err.status === 401) {
            this.handleExpiredSession();
            return;
          }
          console.error(err);
          this.toast.error('Failed to load saved offers.');
        },
      });
  }

  removeFromSaved(offerId: string) {
    this.userService
      .removeCarOfferFromSaved(offerId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toast.success('Removed from saved offers.');
          this.loadSavedOffers();
        },
        error: () => {
          this.toast.error('Failed to remove offer.');
        },
      });
  }

  handleExpiredSession() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toast.error('Your session has expired! Please login');
  }
}
