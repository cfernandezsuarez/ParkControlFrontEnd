import {Component, inject, signal} from '@angular/core';
import {AuthService} from '../../services/authService';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  imports: [
    FormsModule
  ],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  nombre = '';
  password = '';
  error = signal<string | null>(null);

  entrar(): void {
    this.auth.login({ nombre: this.nombre, password: this.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']), // Ir al inicio tras login
      error: () => this.error.set('Usuario o contraseña incorrectos')
    });
  }
}
