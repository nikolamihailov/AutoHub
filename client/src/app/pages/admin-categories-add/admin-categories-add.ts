import { Component } from '@angular/core';
import { CategoryAddForm } from '../../features';
import { BackBtn } from '../../shared/components';

@Component({
  selector: 'app-admin-categories-add',
  imports: [CategoryAddForm, BackBtn],
  templateUrl: './admin-categories-add.html',
  styleUrl: './admin-categories-add.scss',
})
export class AdminCategoriesAdd {}
