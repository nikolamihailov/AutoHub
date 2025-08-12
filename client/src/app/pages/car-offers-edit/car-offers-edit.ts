import { Component } from '@angular/core';
import { CarOfferEditForm } from '../../features/car-offer/car-offer-edit-form/car-offer-edit-form';

@Component({
  selector: 'app-car-offers-edit',
  imports: [CarOfferEditForm],
  templateUrl: './car-offers-edit.html',
  styleUrl: './car-offers-edit.scss',
})
export class CarOffersEdit {}
