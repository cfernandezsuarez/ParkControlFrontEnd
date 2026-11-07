import { Component, inject, signal, output } from '@angular/core';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  irAlRegister = output<void>();

  nombre = '';
  password = '';
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  entrar(): void {
    if (!this.nombre.trim() || !this.password) {
      this.error.set('El nombre y la contraseña son obligatorios')
      return;
    }

    this.cargando.set(true)
    this.error.set(null)

    this.auth.login({ nombre: this.nombre, password: this.password }).subscribe({
      next: () => {
        this.cargando.set(false)
        this.router.navigate(['/dashboard'])
      },
      error: () => {
        this.cargando.set(false)
        this.error.set('Usuario o contraseña incorrectos')
      }
    });
  }
}
