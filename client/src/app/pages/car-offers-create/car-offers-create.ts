import { Component } from '@angular/core';
import { CarOfferCreateForm } from '../../features/car-offer/car-offer-create-form/car-offer-create-form';

@Component({
  selector: 'app-car-offers-create',
  imports: [CarOfferCreateForm],
  templateUrl: './car-offers-create.html',
  styleUrl: './car-offers-create.scss',
})
export class CarOffersCreate {}
