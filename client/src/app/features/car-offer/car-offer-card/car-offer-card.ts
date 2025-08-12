import { Component, Input } from '@angular/core';
import { CarOffer } from '../../../models';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-offer-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './car-offer-card.html',
  styleUrl: './car-offer-card.scss',
})
export class CarOfferCard {
  @Input() offer!: CarOffer;
}
