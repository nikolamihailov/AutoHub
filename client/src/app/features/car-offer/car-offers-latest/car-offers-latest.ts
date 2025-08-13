import { Component, DestroyRef, inject } from '@angular/core';
import { CarOfferService } from '../../../core/services';
import { CarOffer } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CarOfferCard } from '../car-offer-card/car-offer-card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { cardAnimation, listAnimation } from '../../../shared/constants/cardAnimations';

@Component({
  selector: 'app-car-offers-latest',
  imports: [CarOfferCard, MatProgressSpinnerModule],
  templateUrl: './car-offers-latest.html',
  styleUrl: './car-offers-latest.scss',
  animations: [cardAnimation, listAnimation],
})
export class CarOffersLatest {
  private service = inject(CarOfferService);
  private destroyRef = inject(DestroyRef);

  protected isLoading = true;
  protected offers: CarOffer[] = [];
  ngOnInit() {
    const LIMIT = '3';
    const PAGE = '1';
    const SEARCH = '';
    const SORT = 'date_desc';

    this.service
      .getCarOffers(LIMIT, PAGE, SEARCH, SORT)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: (res) => (this.offers = res.carOffers ?? []),
        error: () => (this.offers = []),
      });
  }
}
