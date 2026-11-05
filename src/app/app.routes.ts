import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing'
import { Precio } from './pages/precio/precio';
import {AccesoDenegado} from './pages/acceso-denegado/acceso-denegado';
import {Dashboard} from './pages/dashboard/dashboard';
import {authGuard} from './guards/authGuard';
import {rolGuard} from './guards/rolGuard';
import {Auth} from './pages/auth/auth';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'precio', component: Precio },
  { path: 'login', component: Auth },
  { path: 'acceso-denegado', component: AccesoDenegado },

  // Solo ADMIN
  { path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard, rolGuard],
    data: { roles: ['ADMIN'] }
  },

  { path: '**', redirectTo: '' }
];
