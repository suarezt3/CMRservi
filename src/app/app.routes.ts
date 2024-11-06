import { Routes } from '@angular/router';
import { DetallesClienteComponent } from './pages/detalles-cliente/detalles-cliente.component';
import { NuevoClienteComponent } from './pages/nuevo-cliente/nuevo-cliente.component';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  // { path: 'clientes', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  {path: 'clientes', component: WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'clientes/:id', component: DetallesClienteComponent },
  { path: 'nuevo-cliente', component: NuevoClienteComponent },
  { path: 'editar/:id', component: NuevoClienteComponent },
  { path: 'trabajos', component: TrabajosComponent},
  { path: '**', redirectTo: '/clientes' }
];
