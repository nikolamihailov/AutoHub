import { Component, inject } from '@angular/core';
import { Logo } from '../logo/logo';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/user/authService.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../models';

@Component({
  selector: 'app-header',
  imports: [Logo, RouterModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected authService = inject(AuthService);
  protected router = inject(Router);
  protected toast = inject(ToastrService);

  protected showAdminNav = false;
  protected currentUser = this.authService.currentUser();

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    const user = this.authService.currentUser();
    return !!user && user.role === Role.ADMIN;
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/logout']);
    this.toast.success('You logged out!');
  }

  handleAdminPanelEnter() {
    this.showAdminNav = true;
    this.router.navigate(['/admin-dashboard']);
  }

  handleAdminPanelLeave() {
    this.showAdminNav = false;
    this.router.navigate(['/home']);
  }
}
