import { Component } from '@angular/core';
import { ProfileInfo } from '../../features';

@Component({
  selector: 'app-profile',
  imports: [ProfileInfo],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {}
