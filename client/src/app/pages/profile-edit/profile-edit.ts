import { Component } from '@angular/core';
import { ProfileEditForm } from '../../features';

@Component({
  selector: 'app-profile-edit',
  imports: [ProfileEditForm],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.scss',
})
export class ProfileEdit {}
