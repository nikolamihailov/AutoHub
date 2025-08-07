import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HeaderMobile } from '../header-mobile/header-mobile';
import { HeaderDesktop } from '../header-desktop/header-desktop';

@Component({
  selector: 'app-header',
  imports: [HeaderMobile, HeaderDesktop],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMobile = false;

  // below 600px :)
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
}
