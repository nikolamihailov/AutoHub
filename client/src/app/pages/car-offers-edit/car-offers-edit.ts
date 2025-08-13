import { Component } from '@angular/core';
import { CarOfferEditForm } from '../../features';
import { BackBtn } from '../../shared/components';

@Component({
  selector: 'app-car-offers-edit',
  imports: [CarOfferEditForm, BackBtn],
  templateUrl: './car-offers-edit.html',
  styleUrl: './car-offers-edit.scss',
})
export class CarOffersEdit {}
