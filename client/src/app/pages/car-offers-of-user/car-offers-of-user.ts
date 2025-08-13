import { Component } from '@angular/core';
import { CarOffersForUser } from '../../features';
import { BackBtn } from '../../shared/components';

@Component({
  selector: 'app-car-offers-of-user',
  imports: [CarOffersForUser, BackBtn],
  templateUrl: './car-offers-of-user.html',
  styleUrl: './car-offers-of-user.scss',
})
export class CarOffersOfUser {}
