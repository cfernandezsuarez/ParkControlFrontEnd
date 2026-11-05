export type Rol = 'ADMIN' | 'OPERADOR' | 'ABONADO';

export interface LoginRequest {
  nombre: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UsuarioSession {
  email: string;
  rol: Rol;
}
