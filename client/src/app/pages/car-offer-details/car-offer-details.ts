import { Component } from '@angular/core';
import { CarOfferDetailsContainer } from '../../features/car-offer/car-offer-details-container/car-offer-details-container';
import { BackBtn } from '../../shared/components';

@Component({
  selector: 'app-car-offer-details',
  imports: [CarOfferDetailsContainer, BackBtn],
  templateUrl: './car-offer-details.html',
  styleUrl: './car-offer-details.scss',
})
export class CarOfferDetails {}
