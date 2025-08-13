import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CarOfferService } from '../../../../core/services';
import { ConfirmDialog, ConfirmDialogData } from '../../../../shared/components';
import { CarOfferCard } from '../../../car-offer/car-offer-card/car-offer-card';
import { cardAnimation, listAnimation } from '../../../../shared/constants';
import { Sort } from '../../../../shared/enums';
import { CarOffer } from '../../../../models';

@Component({
  selector: 'app-car-offers-management',
  imports: [
    InfiniteScrollDirective,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    CarOfferCard,
  ],
  templateUrl: './car-offers-management.html',
  styleUrl: './car-offers-management.scss',
  animations: [cardAnimation, listAnimation],
})
export class CarOffersManagement {
  private carOffersService = inject(CarOfferService);
  private destroyRef = inject(DestroyRef);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  protected carOffers: CarOffer[] = [];
  protected page = 1;
  protected itemsPerPage = 12;
  protected canLoadMore = true;
  protected isLoading = false;
  protected initialLoad = true;
  protected searchControl = new FormControl('');

  protected sortOrder: Sort = Sort.DESC;

  ngOnInit(): void {
    const searchFromUrl = this.route.snapshot.queryParamMap.get('search') || '';
    this.searchControl.setValue(searchFromUrl, { emitEvent: false });

    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => {
        this.carOffers = [];
        this.page = 1;
        this.canLoadMore = true;
        this.router.navigate([], {
          queryParams: { search: term || null },
          queryParamsHandling: 'merge',
        });
        this.loadCarOffers(term || '');
      });

    this.loadCarOffers(searchFromUrl);
  }

  loadCarOffers(searchTerm = '') {
    if (this.isLoading || !this.canLoadMore) return;
    this.isLoading = true;

    if (this.initialLoad === true) this.initialLoad = false;

    this.carOffersService
      .getCarOffersAdmin(
        this.itemsPerPage.toString(),
        this.page.toString(),
        searchTerm,
        this.sortOrder,
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

  onSortChange(newOrder: Sort) {
    this.sortOrder = newOrder;
    this.carOffers = [];
    this.page = 1;
    this.canLoadMore = true;
    this.loadCarOffers(this.searchControl.value || '');
  }

  onScroll() {
    this.loadCarOffers(this.searchControl.value || '');
  }

  clearSearch() {
    this.searchControl.setValue('');
  }

  goToAdd() {
    this.router.navigate(['/car-offers/add'], {
      queryParams: { returnTo: this.router.url },
    });
  }

  goToEdit(id: string) {
    this.router.navigate(['/car-offers/edit', id], {
      queryParams: { returnTo: this.router.url },
    });
  }

  confirmDelete(carOffer: CarOffer) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete car offer?',
        message: `Are you sure you want to delete "${carOffer.brand} ${carOffer.model}", this will delete the car from all users saved cars?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && carOffer._id) {
        this.deleteCarOffer(carOffer._id);
      }
    });
  }

  deleteCarOffer(userId: string) {
    this.carOffersService.deleteCarOffer(userId).subscribe({
      next: () => {
        this.toast?.success?.('Car offer deleted.');
        this.carOffers = [];
        this.page = 1;
        this.canLoadMore = true;
        this.loadCarOffers(this.searchControl.value || '');
      },
      error: (err) => {
        this.toast?.error?.('Failed to delete car offer.');
        console.error(err);
      },
    });
  }
}
