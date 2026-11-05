import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';

export const dashboardRedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.tieneRol('ADMIN', 'OPERADOR')) {
    return router.createUrlTree(['/dashboard/plazas']);
  }
  return router.createUrlTree(['/dashboard/mis-tickets']);
};
