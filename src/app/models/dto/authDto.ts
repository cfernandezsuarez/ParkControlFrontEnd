export type Rol = 'ADMIN' | 'OPERADOR' | 'ABONADO';

export interface LoginRequest {
  nombre: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  nombre: string;
  password: string;
}

export interface UsuarioSession {
  nombre: string;
  rol: Rol;
}
