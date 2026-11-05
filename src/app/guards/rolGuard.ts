import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { Rol } from '../models/dto/authDto';

export const rolGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const rolesPermitidos = (route.data['roles'] ?? []) as Rol[];

  if (rolesPermitidos.length === 0) {
    return true;
  }

  if (auth.tieneRol(...rolesPermitidos)) {
    return true;
  }

  return router.createUrlTree(['/acceso-denegado']);
}
