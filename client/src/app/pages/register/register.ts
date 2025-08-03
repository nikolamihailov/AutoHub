import { Component } from '@angular/core';
import { RegisterForm } from '../../features/user/auth/register-form/register-form';

@Component({
  selector: 'app-register',
  imports: [RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
