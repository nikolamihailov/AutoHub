import { Component } from '@angular/core';
import { CarOffersForUser } from '../../features/car-offer/car-offers-for-user/car-offers-for-user';

@Component({
  selector: 'app-my-car-offers',
  imports: [CarOffersForUser],
  templateUrl: './my-car-offers.html',
  styleUrl: './my-car-offers.scss',
})
export class MyCarOffers {}
