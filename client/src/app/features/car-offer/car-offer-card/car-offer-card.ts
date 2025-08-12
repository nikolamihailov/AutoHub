import { Component, Input } from '@angular/core';
import { CarOffer } from '../../../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-car-offer-card',
  imports: [DatePipe],
  templateUrl: './car-offer-card.html',
  styleUrl: './car-offer-card.scss',
})
export class CarOfferCard {
  @Input() offer!: CarOffer;
}
