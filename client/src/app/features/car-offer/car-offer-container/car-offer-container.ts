import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CarOfferService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CarOffer } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CarOfferCard } from '../car-offer-card/car-offer-card';
import { cardAnimation, listAnimation } from '../../../shared/constants/cardAnimations';

@Component({
  selector: 'app-car-offer-container',
  imports: [
    InfiniteScrollDirective,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    CarOfferCard,
  ],
  templateUrl: './car-offer-container.html',
  styleUrl: './car-offer-container.scss',
  animations: [cardAnimation, listAnimation],
})
export class CarOfferContainer {
  private carOffersService = inject(CarOfferService);
  private destroyRef = inject(DestroyRef);
  private toast = inject(ToastrService);
  private router = inject(Router);

  protected carOffers: CarOffer[] = [];
  protected page = 1;
  protected itemsPerPage = 12;
  protected canLoadMore = true;
  protected isLoading = false;
  protected initialLoad = true;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    if (this.isLoading || !this.canLoadMore) return;
    this.isLoading = true;

    if (this.initialLoad === true) this.initialLoad = false;

    this.carOffersService
      .getCarOffers(this.itemsPerPage.toString(), this.page.toString())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (res) => {
          this.carOffers = [...this.carOffers, ...res.carOffers];
          this.page++;
          this.canLoadMore = this.page <= res.pageCount;
        },
        error: (err) => {
          this.toast?.error?.('Failed to load users.');
          console.error(err);
        },
      });
  }

  onScroll() {
    this.loadCategories();
  }

  goToAdd() {
    this.router.navigate(['/car-offers/add']);
  }
}
