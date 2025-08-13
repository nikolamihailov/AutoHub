import { Component } from '@angular/core';
import { CarOffersForUser } from '../../features/car-offer/car-offers-for-user/car-offers-for-user';

@Component({
  selector: 'app-car-offers-of-user',
  imports: [CarOffersForUser],
  templateUrl: './car-offers-of-user.html',
  styleUrl: './car-offers-of-user.scss',
})
export class CarOffersOfUser {}
