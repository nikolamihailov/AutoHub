import { Component } from '@angular/core';
import { Logo } from '../logo/logo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Logo, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
