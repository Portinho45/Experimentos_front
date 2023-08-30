import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RegistrarEstudianteComponent } from './components/registrar-usuario/registrar-estudiante/registrar-estudiante.component';
import { RegistrarReclutadorComponent } from './components/registrar-usuario/registrar-reclutador/registrar-reclutador.component';

const routes: Routes = [
  {
    path:'' ,component:LandingComponent,

  },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent},
  {path: 'registrar-estudiante/:username', component: RegistrarEstudianteComponent},
  {path: 'registrar-reclutador/:username', component: RegistrarReclutadorComponent},
  {
    path: 'pages',
    loadChildren: () => import('./components/pages.module').then((m) => m.PagesModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
