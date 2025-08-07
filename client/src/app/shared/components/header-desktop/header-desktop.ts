import { Component, inject, OnInit } from '@angular/core';
import { Logo } from '../logo/logo';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/user/authService.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../models';

@Component({
  selector: 'app-header-desktop',
  imports: [Logo, RouterModule, MatIconModule, MatMenuModule],
  templateUrl: './header-desktop.html',
  styleUrl: './header-desktop.scss',
})
export class HeaderDesktop implements OnInit {
  protected authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  protected showAdminNav = false;
  protected currentUser = this.authService.currentUser();

  ngOnInit() {
    this.checkAdminNav();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAdminNav();
      }
    });
  }

  private checkAdminNav() {
    this.showAdminNav = this.router.url.includes('admin') && this.isAdmin();
  }

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
