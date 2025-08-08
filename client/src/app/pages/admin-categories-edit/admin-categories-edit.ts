import { Component } from '@angular/core';
import { CategoryEditForm } from '../../features';

@Component({
  selector: 'app-admin-categories-edit',
  imports: [CategoryEditForm],
  templateUrl: './admin-categories-edit.html',
  styleUrl: './admin-categories-edit.scss',
})
export class AdminCategoriesEdit {}
