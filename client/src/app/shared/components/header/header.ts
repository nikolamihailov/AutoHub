import { Component } from '@angular/core';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
