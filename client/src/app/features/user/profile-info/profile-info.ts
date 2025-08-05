import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../../models';
import { Userservice } from '../../../core/services/user/userService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  imports: [MatIconModule, MatProgressSpinnerModule],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.scss',
})
export class ProfileInfo implements OnInit {
  private userService = inject(Userservice);
  private router = inject(Router);

  protected user: User | null = null;
  protected isLoading = true;
  protected errorMsg: string | null = null;

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe({
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
