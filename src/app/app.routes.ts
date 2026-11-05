import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing'
import { Precio } from './pages/precio/precio';
import {AccesoDenegado} from './pages/acceso-denegado/acceso-denegado';
import {Dashboard} from './pages/dashboard/dashboard';
import {authGuard} from './guards/authGuard';
import {rolGuard} from './guards/rolGuard';
import {Auth} from './pages/auth/auth';
import {PrivateLayout} from './layouts/private-layout/private-layout';
import {PublicLayout} from './layouts/public-layout/public-layout';
import {Abonados} from './pages/abonados/abonados';

export const routes: Routes = [
  // 1. ZONA PÚBLICA
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Landing },
      { path: 'precio', component: Precio },
      { path: 'login', component: Auth },
      { path: 'acceso-denegado', component: AccesoDenegado }
    ]
  },

  // 2. ZONA PRIVADA
  {
    path: '',
    component: PrivateLayout,
    canActivate: [authGuard], // Protege toda la zona privada
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        // Todos los roles pueden acceder al contenedor
        canActivate: [rolGuard],
        data: { roles: ['ADMIN', 'OPERADOR', 'ABONADO'] },
        children: [
          // Redirección por defecto según el rol (la gestionamos en el componente o con un guard)
          { path: '', redirectTo: 'mis-tickets', pathMatch: 'full' },

          // --- RUTAS DE ABONADO (todos pueden verlas, aunque el menú solo se las muestra a ellos) ---
          {
            path: 'mis-tickets',
            component: MisTickets,
            canActivate: [rolGuard],
            data: { roles: ['ADMIN', 'OPERADOR', 'ABONADO'] } // Por si quieres que un admin vea los tickets de un abonado
          },
          {
            path: 'mi-abono',
            component: MiAbono,
            canActivate: [rolGuard],
            data: { roles: ['ABONADO'] } // Solo el abonado ve su propio abono
          },

          // --- RUTAS DE OPERADOR (OPERADOR y ADMIN) ---
          {
            path: 'plazas',
            component: Plazas,
            canActivate: [rolGuard],
            data: { roles: ['OPERADOR', 'ADMIN'] }
          },
          {
            path: 'tickets',
            component: Tickets,
            canActivate: [rolGuard],
            data: { roles: ['OPERADOR', 'ADMIN'] }
          },
          {
            path: 'barrera',
            component: Barrera,
            canActivate: [rolGuard],
            data: { roles: ['OPERADOR', 'ADMIN'] }
          },

          // --- RUTAS DE ADMIN ---
          {
            path: 'abonados',
            component: Abonados,
            canActivate: [rolGuard],
            data: { roles: ['ADMIN'] }
          },
          {
            path: 'tarifas',
            component: Tarifas,
            canActivate: [rolGuard],
            data: { roles: ['ADMIN'] }
          },
          {
            path: 'informes',
            component: Informes,
            canActivate: [rolGuard],
            data: { roles: ['ADMIN'] }
          }
        ]
      }
    ]
  },

  { path: '**', redirectTo: '' }
];
