import { Component } from '@angular/core';
import { CarOfferContainer } from '../../features';

@Component({
  selector: 'app-car-offers',
  imports: [CarOfferContainer],
  templateUrl: './car-offers.html',
  styleUrl: './car-offers.scss',
})
export class CarOffers {}
