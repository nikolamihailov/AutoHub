import { Component } from '@angular/core';
import { AdminPageHeader } from '../../shared/components';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminPageHeader],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {}
