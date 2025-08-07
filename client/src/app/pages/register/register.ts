import { Component } from '@angular/core';
import { RegisterForm } from '../../features';

@Component({
  selector: 'app-register',
  imports: [RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
