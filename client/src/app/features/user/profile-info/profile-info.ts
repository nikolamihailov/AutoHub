import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService, UserService } from '../../../core/services';
import { AccountType, User } from '../../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-info',
  imports: [MatIconModule, MatProgressSpinnerModule],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.scss',
})
export class ProfileInfo implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private toast = inject(ToastrService);

  protected user: User | null = null;
  protected isLoading = true;
  protected errorMsg: string | null = null;

  protected showAccountInfo = false;

  protected accountTypes = {
    [AccountType.DEALERSHIP]: 'Dealership',
    [AccountType.PRIVATE_ACCOUNT]: 'Private',
  };

  ngOnInit(): void {
    this.userService
      .getUserInfo()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response: User) => {
          this.user = response;
        },
        error: (err) => {
          if (err.status === 401) {
            this.handleExpiredSession();
            return;
          }
          this.errorMsg = 'Failed to load user profile.';
          this.toast.error('Failed to load user data');
        },
      });
  }

  toggleShowInfoBtn() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  handleEditBtn() {
    this.router.navigate(['/profile-edit']);
  }

  handleExpiredSession() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toast.error('Your session has expired! Please login');
  }
}
