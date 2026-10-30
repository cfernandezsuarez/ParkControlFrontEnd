import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing'
import { Precio } from './pages/precio/precio';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'precio', component: Precio }
];
