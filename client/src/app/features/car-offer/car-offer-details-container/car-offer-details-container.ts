import { Component, DestroyRef, inject } from '@angular/core';
import { AccountType, CarOffer, CarOfferDetails, Category } from '../../../models';
import { CarOfferService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-car-offer-details-container',
  imports: [MatProgressSpinnerModule, DatePipe, MatIconModule],
  templateUrl: './car-offer-details-container.html',
  styleUrl: './car-offer-details-container.scss',
})
export class CarOfferDetailsContainer {
  private carOffersService = inject(CarOfferService);
  /*   private toast = inject(ToastrService);
  private router = inject(Router); */
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  protected carOffer: CarOfferDetails | null = null;
  protected isLoading = true;
  protected errorMsg: string | null = null;
  protected selectedImage: string | null = null;

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
        },
        error: (err: any) => {
          console.log(err);
          this.errorMsg = 'Failed to load user profile.';
        },
      });
  }
}
