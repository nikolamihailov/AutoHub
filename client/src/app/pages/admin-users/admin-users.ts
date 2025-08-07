import { Component } from '@angular/core';
import { UsersInfo } from '../../features';
import { AdminPageHeader } from '../../shared/components';

@Component({
  selector: 'app-admin-users',
  imports: [UsersInfo, AdminPageHeader],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers {}
