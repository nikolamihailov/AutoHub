import { Component, inject } from '@angular/core';
import { Logo } from '../logo/logo';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/user/authService.service';

@Component({
  selector: 'app-header',
  imports: [Logo, RouterLink, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected authService = inject(AuthService);

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
