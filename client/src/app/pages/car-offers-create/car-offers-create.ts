import { Component } from '@angular/core';
import { CarOfferCreateForm } from '../../features';
import { BackBtn } from '../../shared/components';

@Component({
  selector: 'app-car-offers-create',
  imports: [CarOfferCreateForm, BackBtn],
  templateUrl: './car-offers-create.html',
  styleUrl: './car-offers-create.scss',
})
export class CarOffersCreate {}
