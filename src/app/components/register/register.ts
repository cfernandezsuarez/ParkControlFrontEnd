import { Component, inject, signal, output } from '@angular/core';
import {AuthService} from '../../services/authService';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);
  irAlLogin = output<void>();

  nombre = '';
  password = '';
  error = signal<string | null>(null);

  registrar() {

  }
}
