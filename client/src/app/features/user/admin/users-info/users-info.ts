import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { User } from '../../../../models';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { cardAnimation, listAnimation } from '../../../../shared/constants/cardAnimations';
import { ConfirmDialog, ConfirmDialogData } from '../../../../shared/components';
import { Sort } from '../../../../shared/enums/Sort.enum';
import { UserService } from '../../../../core/services';

@Component({
  selector: 'app-users-info',
  imports: [
    InfiniteScrollDirective,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './users-info.html',
  styleUrl: './users-info.scss',
  animations: [cardAnimation, listAnimation],
})
export class UsersInfo implements OnInit {
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  protected users: User[] = [];
  protected page = 1;
  protected itemsPerPage = 12;
  protected canLoadMore = true;
  protected initialLoad = true;
  protected isLoading = false;
  protected searchControl = new FormControl('');

  protected sortOrder: Sort = Sort.ASC;

  ngOnInit(): void {
    const searchFromUrl = this.route.snapshot.queryParamMap.get('search') || '';
    this.searchControl.setValue(searchFromUrl, { emitEvent: false });

    this.searchControl.valueChanges
      .pipe(
        startWith(searchFromUrl),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((term) => {
        this.users = [];
        this.page = 1;
        this.canLoadMore = true;
        this.router.navigate([], {
          queryParams: { search: term || null },
          queryParamsHandling: 'merge',
        });
        this.loadUsers(term || '');
      });
  }

  loadUsers(searchTerm = '') {
    if (this.isLoading || !this.canLoadMore) return;
    this.isLoading = true;

    if (this.initialLoad === true) this.initialLoad = false;

    this.userService
      .getUsers(this.itemsPerPage.toString(), this.page.toString(), searchTerm, this.sortOrder)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (res) => {
          this.users = [...this.users, ...res.users];
          this.page++;
          this.canLoadMore = this.page <= res.pageCount;
        },
        error: (err) => {
          this.toast?.error?.('Failed to load users.');
          console.error(err);
        },
      });
  }

  onSortChange(newOrder: Sort) {
    this.sortOrder = newOrder;
    this.users = [];
    this.page = 1;
    this.canLoadMore = true;
    this.loadUsers(this.searchControl.value || '');
  }

  onScroll() {
    this.loadUsers(this.searchControl.value || '');
  }

  clearSearch() {
    this.searchControl.setValue('');
  }

  confirmDelete(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete User?',
        message: `Are you sure you want to delete "${user.firstName} ${user.lastName}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && user._id) {
        this.deleteUser(user._id);
      }
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.toast?.success?.('User deleted.');
        this.users = [];
        this.page = 1;
        this.canLoadMore = true;
        this.loadUsers(this.searchControl.value || '');
      },
      error: (err) => {
        this.toast?.error?.('Failed to delete user.');
        console.error(err);
      },
    });
  }
}
