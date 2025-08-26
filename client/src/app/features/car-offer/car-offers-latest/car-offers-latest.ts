import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { CarOfferService } from '../../../core/services';
import { CarOfferCard } from '../car-offer-card/car-offer-card';
import { cardAnimation, listAnimation } from '../../../shared/constants';
import { CarOffer } from '../../../models';

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
    const LIMIT = '4';
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
