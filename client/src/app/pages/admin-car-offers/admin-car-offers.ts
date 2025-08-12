import { Component } from '@angular/core';
import { AdminPageHeader } from '../../shared/components';
import { CarOffersManagement } from '../../features/user/admin/car-offers-management/car-offers-management';

@Component({
  selector: 'app-admin-car-offers',
  imports: [AdminPageHeader, CarOffersManagement],
  templateUrl: './admin-car-offers.html',
  styleUrl: './admin-car-offers.scss',
})
export class AdminCarOffers {}
