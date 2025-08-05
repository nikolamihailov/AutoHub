import { Component } from '@angular/core';
import { UsersInfo } from '../../features/user/admin/users-info/users-info';

@Component({
  selector: 'app-admin-users',
  imports: [UsersInfo],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers {}
