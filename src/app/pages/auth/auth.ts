import { Component } from '@angular/core';
import {Login} from '../../components/login/login';
import {Register} from '../../components/register/register';

@Component({
  imports: [
    Login,
    Register
  ],
  selector: 'app-auth',
  styleUrl: './auth.css',
  templateUrl: './auth.html',
})
export class Auth {}
