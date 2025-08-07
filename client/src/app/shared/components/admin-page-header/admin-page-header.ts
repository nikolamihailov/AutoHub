import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-page-header',
  imports: [],
  templateUrl: './admin-page-header.html',
  styleUrl: './admin-page-header.scss',
})
export class AdminPageHeader {
  @Input() name!: string;
  @Input() descriptionTitle!: string;
  @Input() descriptionText!: string;
}
