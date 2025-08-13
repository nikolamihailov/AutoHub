import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Statistics } from '../../shared/components';

@Component({
  selector: 'app-about-us',
  imports: [MatCard, MatIconModule, Statistics],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {}
