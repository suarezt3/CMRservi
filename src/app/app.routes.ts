import { Routes } from '@angular/router';
import { DetallesClienteComponent } from './pages/detalles-cliente/detalles-cliente.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/clientes' },
  { path: 'clientes', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'id', component: DetallesClienteComponent }
];
