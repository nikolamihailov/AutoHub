import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CarOfferService } from '../../../core/services';
import { CarOfferCard } from '../car-offer-card/car-offer-card';
import { cardAnimation, listAnimation } from '../../../shared/constants';
import { CarOffer } from '../../../models';

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
  private route = inject(ActivatedRoute);

  protected carOffers: CarOffer[] = [];
  protected page = 1;
  protected itemsPerPage = 12;
  protected canLoadMore = true;
  protected isLoading = false;
  protected initialLoad = true;

  protected searchControl = new FormControl('');

  protected sortOption = 'date_desc';

  ngOnInit(): void {
    const searchFromUrl = this.route.snapshot.queryParamMap.get('search') || '';
    const categoryFromUrl = this.route.snapshot.queryParamMap.get('category') || '';

    this.searchControl.setValue(searchFromUrl, { emitEvent: false });

    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => {
        const currentCategory = this.route.snapshot.queryParamMap.get('category') || '';
        this.carOffers = [];
        this.page = 1;
        this.canLoadMore = true;
        this.router.navigate([], {
          queryParams: { search: term || null, category: currentCategory || null },
          queryParamsHandling: 'merge',
        });
        this.loadCarOffers(term || '', categoryFromUrl);
      });

    this.loadCarOffers(searchFromUrl, categoryFromUrl);

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const cat = params.get('category') || '';
      const term = params.get('search') || '';
      this.carOffers = [];
      this.page = 1;
      this.canLoadMore = true;
      this.loadCarOffers(term, cat);
    });
  }

  loadCarOffers(searchTerm = '', category = '') {
    if (this.isLoading || !this.canLoadMore) return;
    this.isLoading = true;

    if (this.initialLoad === true) this.initialLoad = false;

    this.carOffersService
      .getCarOffers(
        this.itemsPerPage.toString(),
        this.page.toString(),
        searchTerm,
        this.sortOption,
        category,
      )
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
          this.toast?.error?.('Failed to load car offers.');
          console.error(err);
        },
      });
  }

  onSortChange(newOption: string) {
    this.sortOption = newOption;
    this.carOffers = [];
    this.page = 1;
    this.canLoadMore = true;

    const currentCategory = this.route.snapshot.queryParamMap.get('category') || '';
    const currentSearch = this.searchControl.value || '';

    this.router.navigate([], {
      queryParams: {
        search: currentSearch || null,
        category: currentCategory || null,
        sort: this.sortOption || null,
      },
      queryParamsHandling: 'merge',
    });

    this.loadCarOffers(currentSearch, currentCategory);
  }

  clearSearch() {
    const currentCategory = this.route.snapshot.queryParamMap.get('category') || '';
    this.searchControl.setValue('', { emitEvent: false });
    this.router.navigate([], {
      queryParams: { search: null, category: currentCategory || null },
      queryParamsHandling: 'merge',
    });
    this.carOffers = [];
    this.page = 1;
    this.canLoadMore = true;
    this.loadCarOffers('', currentCategory);
  }

  onScroll() {
    this.loadCarOffers(this.searchControl.value || '');
  }
}
