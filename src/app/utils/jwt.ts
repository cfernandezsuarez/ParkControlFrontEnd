import { Rol } from '../models/dto/authDto'

export interface JwtPayload {
  sub: string;
  rol: Rol;
  exp: number;
}

export function decodificarToken(token: string): JwtPayload | null {
  try {
    const partes = token.split('.')
    if (partes.length !== 3) return null;

    const base64 = partes[1].replace(/-/g, '+').replace(/_/g, '/')

    return JSON.parse(atob(base64)) as JwtPayload
  } catch {
    return null;
  }
}

export function tokenCaducado(token: string): boolean {
  const payload = decodificarToken(token)
  if (!payload) return false;
  return payload.exp * 1000 < Date.now();
}
