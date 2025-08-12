import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountType, User } from '../../../models';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-profile-info',
  imports: [MatIconModule, MatProgressSpinnerModule],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.scss',
})
export class ProfileInfo implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  protected user: User | null = null;
  protected isLoading = true;
  protected errorMsg: string | null = null;

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
        error: (err: any) => {
          console.log(err);
          this.errorMsg = 'Failed to load user profile.';
        },
      });
  }

  handleEditBtn() {
    this.router.navigate(['/profile-edit']);
  }
}
