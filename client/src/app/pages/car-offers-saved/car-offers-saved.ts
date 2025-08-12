import { Component } from '@angular/core';
import { CarOffersSavedContainer } from '../../features/car-offer/car-offers-saved-container/car-offers-saved-container';

@Component({
  selector: 'app-car-offers-saved',
  imports: [CarOffersSavedContainer],
  templateUrl: './car-offers-saved.html',
  styleUrl: './car-offers-saved.scss',
})
export class CarOffersSaved {}
