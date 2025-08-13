import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CarOfferCard } from '../car-offer-card/car-offer-card';
import { cardAnimation, listAnimation } from '../../../shared/constants/cardAnimations';
import { CarOfferService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CarOffer } from '../../../models';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialog, ConfirmDialogData } from '../../../shared/components';

@Component({
  selector: 'app-car-offers-for-user',
  imports: [
    InfiniteScrollDirective,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    CarOfferCard,
  ],
  templateUrl: './car-offers-for-user.html',
  styleUrl: './car-offers-for-user.scss',
  animations: [cardAnimation, listAnimation],
})
export class CarOffersForUser {
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
  protected canManage = true;

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

    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.canManage = false;

    const userId = id ? id : undefined;
    const includeActive = id ? true : false;

    this.carOffersService
      .getCarOffersForUser(
        userId,
        this.itemsPerPage.toString(),
        this.page.toString(),
        searchTerm,
        includeActive,
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

  onScroll() {
    this.loadCarOffers(this.searchControl.value || '');
  }

  clearSearch() {
    this.searchControl.setValue('');
  }

  goToAdd() {
    this.router.navigate(['/car-offers/add']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/car-offers/edit', id]);
  }

  confirmDelete(carOffer: CarOffer) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete car offer?',
        message: `Are you sure you want to delete "${carOffer.brand} ${carOffer.model}"?`,
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
