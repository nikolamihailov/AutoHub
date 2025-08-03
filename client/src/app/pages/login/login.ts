import { Component } from '@angular/core';
import { LoginForm } from '../../features';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
