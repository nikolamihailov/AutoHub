import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../core/services';
import { Category } from '../../../models';

@Component({
  selector: 'app-categories-dropdown',
  imports: [MatMenuModule, MatIconModule, RouterLink],
  templateUrl: './categories-dropdown.html',
  styleUrl: './categories-dropdown.scss',
})
export class CategoriesDropdown {
  @Input() mobile = false;
  @Output() selected = new EventEmitter<void>();

  private categoryService = inject(CategoryService);
  private toast = inject(ToastrService);
  private destroyRef = inject(DestroyRef);

  protected categories: Category[] = [];
  protected isLoading = true;
  protected open = false;

  ngOnInit(): void {
    this.categoryService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cats) => {
          this.categories = cats;
          this.isLoading = false;
        },
        error: () => {
          this.toast.error('Failed fetching categories');
        },
      });
  }

  toggleMobile() {
    this.open = !this.open;
  }
  onSelect() {
    this.selected.emit();
  }
}
