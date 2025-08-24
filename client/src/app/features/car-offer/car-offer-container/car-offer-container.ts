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
    const params = this.route.snapshot.queryParamMap;
    const searchFromUrl = params.get('search') || '';
    const categoryFromUrl = params.get('category') || '';
    const sortFromUrl = params.get('sort') || this.sortOption;

    this.sortOption = sortFromUrl;
    this.searchControl.setValue(searchFromUrl, { emitEvent: false });

    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => {
        const currentCategory = this.route.snapshot.queryParamMap.get('category') || '';
        const currentSort = this.route.snapshot.queryParamMap.get('sort') || this.sortOption;

        this.resetList();
        this.router.navigate([], {
          queryParams: {
            search: term || null,
            category: currentCategory || null,
            sort: currentSort || null,
          },
          queryParamsHandling: 'merge',
        });
        this.loadCarOffers(term || '', currentCategory, currentSort);
      });

    this.loadCarOffers(searchFromUrl, categoryFromUrl, sortFromUrl);

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((qp) => {
      const cat = qp.get('category') || '';
      const term = qp.get('search') || '';
      const sort = qp.get('sort') || this.sortOption;

      if (sort !== this.sortOption) this.sortOption = sort;

      this.resetList();
      this.loadCarOffers(term, cat, sort);
    });
  }

  private resetList() {
    this.carOffers = [];
    this.page = 1;
    this.canLoadMore = true;
  }

  loadCarOffers(searchTerm = '', category = '', sort = this.sortOption) {
    if (this.isLoading || !this.canLoadMore) return;
    this.isLoading = true;
    if (this.initialLoad) this.initialLoad = false;

    this.carOffersService
      .getCarOffers(this.itemsPerPage.toString(), this.page.toString(), searchTerm, sort, category)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe({
        next: (res) => {
          this.carOffers = [...this.carOffers, ...res.carOffers];
          this.page++;
          this.canLoadMore = this.page <= res.pageCount;
        },
        error: () => this.toast?.error?.('Failed to load car offers.'),
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
    const currentSort = this.route.snapshot.queryParamMap.get('sort') || this.sortOption;

    this.searchControl.setValue('', { emitEvent: false });
    this.resetList();

    this.router.navigate([], {
      queryParams: { search: null, category: currentCategory || null, sort: currentSort || null },
      queryParamsHandling: 'merge',
    });

    this.loadCarOffers('', currentCategory, currentSort);
  }

  onScroll() {
    this.loadCarOffers(this.searchControl.value || '');
  }
}
