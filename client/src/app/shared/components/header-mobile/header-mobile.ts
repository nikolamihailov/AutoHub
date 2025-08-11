import { Component, inject, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Logo } from '../logo/logo';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../models';
import { AuthService } from '../../../core/services';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, RouterModule, Logo],
  templateUrl: './header-mobile.html',
  styleUrl: './header-mobile.scss',
})
export class HeaderMobile implements OnInit {
  private authService = inject(AuthService);
  private toast = inject(ToastrService);
  private router = inject(Router);

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

  isAdmin(): boolean {
    const user = this.authService.currentUser();
    return !!user && user.role === Role.ADMIN;
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  handleAdminPanelEnter(sidenav: MatSidenav) {
    this.showAdminNav = true;
    this.router.navigate(['/admin-dashboard']);
    sidenav.close();
  }

  handleAdminPanelLeave(sidenav: MatSidenav) {
    this.showAdminNav = false;
    this.router.navigate(['/home']);
    sidenav.close();
  }

  handleLogout(sidenav: MatSidenav) {
    this.authService.logout();
    this.toast.success('You logged out!');
    sidenav.close();
  }
}
