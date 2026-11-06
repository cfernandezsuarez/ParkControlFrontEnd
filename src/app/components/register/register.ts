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
  confirmPassword = '';
  cargando = signal(false);
  error = signal<string | null>(null);
  exito = signal<string | null>(null);

  registrar() {

    if (!this.nombre.trim() || !this.password.trim()) {
      this.error.set("El nombre y la contraseña son obligatorios")
      return;
    }

    if (this.password.length < 6) {
      this.error.set("La contraseña debe tener al menos 6 caracteres")
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set("Las contraseñas no coinciden")
      return;
    }

    this.cargando.set(true)
    this.error.set(null)
    this.exito.set(null)

    this.auth.register({ nombre: this.nombre, password: this.password }).subscribe({
      next: () => {
        this.cargando.set(false)
        this.auth.login({ nombre: this.nombre, password: this.password }).subscribe({
          next: () => {
            this.cargando.set(false)
            this.router.navigate(['/dashboard'])
          },
          error: () => {
            this.cargando.set(false)
            this.error.set('Registro completado, pero no se pudo iniciar sesión. Inténtalo manualmente.');
          }
        })
      },
      error: (err) => {
        this.cargando.set(false)
        const mensaje = err.error?.detail || err.error?.message || 'Error al registrar el usuario'
        this.error.set(mensaje)
      }
    })
  }
}
