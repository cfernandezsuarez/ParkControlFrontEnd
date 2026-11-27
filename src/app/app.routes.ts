import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { Landing } from './pages/landing/landing';
import { Precio } from './pages/precio/precio';
import { AccesoDenegado } from './pages/acceso-denegado/acceso-denegado';
import { Auth } from './pages/auth/auth';
import { Dashboard } from './pages/dashboard/dashboard';
import { Inicio } from './pages/dashboard/inicio/inicio';
import { MisTickets } from './pages/dashboard/mis-tickets/mis-tickets';
import { TarifaDashboard } from './pages/dashboard/tarifa-dashboard/tarifa-dashboard';
import { Tickets } from './pages/dashboard/tickets/tickets';
import { Plazas } from './pages/dashboard/plazas/plazas';
import { Informes } from './pages/dashboard/informes/informes';
import { authGuard } from './guards/authGuard';
import { rolGuard } from './guards/rolGuard';
import { Entrada } from './pages/dashboard/entrada/entrada';
import {TarifaAdmin} from './pages/dashboard/tarifa-admin/tarifa-admin';
import {Cajero} from './pages/dashboard/cajero/cajero';
import {Abonados} from './pages/dashboard/abonados/abonados';
import {Promociones} from './pages/promociones/promociones';
import {PlazasAdmin} from './pages/dashboard/plazas-admin/plazas-admin';

export const routes: Routes = [
  // 1. ZONA PÚBLICA
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Landing },
      { path: 'precio', component: Precio },
      { path: 'promociones', component: Promociones },
      { path: 'login', component: Auth },
      { path: 'acceso-denegado', component: AccesoDenegado },
    ],
  },

  // 2. ZONA PRIVADA
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard, rolGuard],
    data: { roles: ['ADMIN', 'OPERADOR', 'ABONADO'] },
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: Inicio },

      // ABONADO
      {
        path: 'mis-tickets',
        component: MisTickets,
        canActivate: [rolGuard],
        data: { roles: ['ABONADO'] },
      },
      {
        path: 'tarifa',
        component: TarifaDashboard,
        canActivate: [rolGuard],
        data: { roles: ['ABONADO'] },
      },

      // OPERADOR y ADMIN
      {
        path: 'entrada',
        component: Entrada,
        canActivate: [rolGuard],
        data: { roles: ['OPERADOR', 'ADMIN'] },
      },
      {
        path: 'tickets',
        component: Tickets,
        canActivate: [rolGuard],
        data: { roles: ['OPERADOR', 'ADMIN'] },
      },
      {
        path: 'plazas',
        component: Plazas,
        canActivate: [rolGuard],
        data: { roles: ['OPERADOR', 'ADMIN'] },
      },
      {
        path: 'cajero',
        component: Cajero,
        canActivate: [rolGuard],
        data: { roles: ['OPERADOR', 'ADMIN'] },
      },

      // ADMIN
      {
        path: 'informes',
        component: Informes,
        canActivate: [rolGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'tarifas-total',
        component: TarifaAdmin,
        canActivate: [rolGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'abonados',
        component: Abonados,
        canActivate: [rolGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'plazas-admin',
        component: PlazasAdmin,
        canActivate: [rolGuard],
        data: { roles: ['ADMIN'] },
      }
    ],
  },

  { path: '**', redirectTo: '' },
];
