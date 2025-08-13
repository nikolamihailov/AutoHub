import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarOffersLatest } from '../../features/car-offer/car-offers-latest/car-offers-latest';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, CarOffersLatest, MatExpansionModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}
