import { Routes } from '@angular/router';
import { DetallesClienteComponent } from './pages/detalles-cliente/detalles-cliente.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/clientes' },
  { path: 'clientes', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'clientes/:id', component: DetallesClienteComponent },
  { path: 'nuevo-cliente', component: NuevoClienteComponent },
  { path: 'editar/:id', component: NuevoClienteComponent },
  { path: 'trabajos', component: TrabajosComponent}
];
