import { Component } from '@angular/core';
import { CategoriesManagement } from '../../features';
import { AdminPageHeader } from '../../shared/components';

@Component({
  selector: 'app-admin-categories',
  imports: [CategoriesManagement, AdminPageHeader],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.scss',
})
export class AdminCategories {}
