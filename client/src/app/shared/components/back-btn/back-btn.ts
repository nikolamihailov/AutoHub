import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-back-btn',
  imports: [MatIcon],
  templateUrl: './back-btn.html',
  styleUrl: './back-btn.scss',
})
export class BackBtn {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
