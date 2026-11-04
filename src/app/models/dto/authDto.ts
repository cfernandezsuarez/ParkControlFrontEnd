export type Rol = 'ADMIN' | 'OPERADOR' | 'ABONADO';

export interface LoginRequest {
    email: string;
    password: string; 
}

export interface LoginResponse {
    token: string;
}