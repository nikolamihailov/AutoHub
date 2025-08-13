import { Component } from '@angular/core';
import { CategoryEditForm } from '../../features';
import { BackBtn } from '../../shared/components';

@Component({
  selector: 'app-admin-categories-edit',
  imports: [CategoryEditForm, BackBtn],
  templateUrl: './admin-categories-edit.html',
  styleUrl: './admin-categories-edit.scss',
})
export class AdminCategoriesEdit {}
