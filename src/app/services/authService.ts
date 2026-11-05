import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, Rol, UsuarioSession } from '../models/dto/authDto';
import { decodificarToken } from '../utils/jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN = 'parkcontrol_token';

  readonly usuario = signal<UsuarioSession | null>(this.leerSesion());
  readonly autenticado = computed(() => this.usuario() !== null);

  login(datos: LoginRequest): Observable<void> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, datos).pipe(
      map((respuesta) => {
        sessionStorage.setItem(this.TOKEN, respuesta.token)
        this.usuario.set(this.leerSesion())
      })
    )
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN)
    this.usuario.set(null)
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN);
  }

  tieneRol(...roles: string[]): boolean {
    const user = this.usuario()
    return user !== null && user && roles.includes(user.rol)
  }

  private leerSesion(): UsuarioSession | null {
    const token = sessionStorage.getItem(this.TOKEN)
    const payload = token ? decodificarToken(token) : null

    if (!payload || payload.exp * 1000 < Date.now()) {
      sessionStorage.removeItem(this.TOKEN)
      return null;
    }

    return { nombre: payload.sub, rol: payload.rol }
  }
}
