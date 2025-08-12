import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../../../models';
import { Sort } from '../../../../shared/enums/Sort.enum';
import { debounceTime, distinctUntilChanged, finalize, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialog, ConfirmDialogData } from '../../../../shared/components';
import { cardAnimation, listAnimation } from '../../../../shared/constants/cardAnimations';
import { CategoryService } from '../../../../core/services';

@Component({
  selector: 'app-categories-management',
  imports: [
    InfiniteScrollDirective,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './categories-management.html',
  styleUrl: './categories-management.scss',
  animations: [cardAnimation, listAnimation],
})
export class CategoriesManagement {
  private categoryService = inject(CategoryService);
  private destroyRef = inject(DestroyRef);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  protected categories: Category[] = [];
  protected page = 1;
  protected itemsPerPage = 12;
  protected canLoadMore = true;
  protected isLoading = false;
  protected initialLoad = true;
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
        this.categories = [];
        this.page = 1;
        this.canLoadMore = true;
        this.router.navigate([], {
          queryParams: { search: term || null },
          queryParamsHandling: 'merge',
        });
        this.loadCategories(term || '');
      });
  }

  loadCategories(searchTerm = '') {
    if (this.isLoading || !this.canLoadMore) return;
    this.isLoading = true;

    if (this.initialLoad === true) this.initialLoad = false;

    this.categoryService
      .getCategories(this.itemsPerPage.toString(), this.page.toString(), searchTerm, this.sortOrder)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (res) => {
          this.categories = [...this.categories, ...res.categories];
          this.page++;
          this.canLoadMore = this.page <= res.pageCount;
        },
        error: (err) => {
          this.toast?.error?.('Failed to load categories.');
          console.error(err);
        },
      });
  }

  onSortChange(newOrder: Sort) {
    this.sortOrder = newOrder;
    this.categories = [];
    this.page = 1;
    this.canLoadMore = true;
    this.loadCategories(this.searchControl.value || '');
  }

  onScroll() {
    this.loadCategories(this.searchControl.value || '');
  }

  clearSearch() {
    this.searchControl.setValue('');
  }

  goToAdd() {
    this.router.navigate(['/admin-dashboard/categories/add']);
  }

  goToEdit(id: string) {
    this.router.navigate(['/admin-dashboard/categories/edit', id]);
  }

  confirmDelete(category: Category) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete category?',
        message: `Are you sure you want to delete "${category.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && category._id) {
        this.deleteCategory(category._id);
      }
    });
  }

  deleteCategory(userId: string) {
    this.categoryService.deleteCategory(userId).subscribe({
      next: () => {
        this.toast?.success?.('Category deleted.');
        this.categories = [];
        this.page = 1;
        this.canLoadMore = true;
        this.loadCategories(this.searchControl.value || '');
      },
      error: (err) => {
        this.toast?.error?.('Failed to delete category.');
        console.error(err);
      },
    });
  }
}
