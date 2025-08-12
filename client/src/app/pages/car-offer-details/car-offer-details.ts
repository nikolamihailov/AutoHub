import { Component } from '@angular/core';
import { CarOfferDetailsContainer } from '../../features/car-offer/car-offer-details-container/car-offer-details-container';

@Component({
  selector: 'app-car-offer-details',
  imports: [CarOfferDetailsContainer],
  templateUrl: './car-offer-details.html',
  styleUrl: './car-offer-details.scss',
})
export class CarOfferDetails {}
