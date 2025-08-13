import { Component } from '@angular/core';
import { CarOffersForUser } from '../../features';

@Component({
  selector: 'app-my-car-offers',
  imports: [CarOffersForUser],
  templateUrl: './my-car-offers.html',
  styleUrl: './my-car-offers.scss',
})
export class MyCarOffers {}
