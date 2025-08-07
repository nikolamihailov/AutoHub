import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
