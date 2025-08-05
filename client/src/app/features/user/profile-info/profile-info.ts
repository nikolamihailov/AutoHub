import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../../models';
import { UserService } from '../../../core/services/user/userService.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
          this.isLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.errorMsg = 'Failed to load user profile.';
          this.isLoading = false;
        },
      });
  }

  handleEditBtn() {
    this.router.navigate(['/profile-edit']);
  }
}
