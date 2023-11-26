import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';

const routes: Routes = [
  //Protected Routes
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Grafica 1' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'ProgressBar' },
      },
      {
        path: 'account-setting',
        component: AcountSettingComponent,
        data: { titulo: 'Ajustes' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },

      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS' } },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil de Usuario' },
      },

      //Mantenimientos
      {
        path: 'users',
        component: UsuariosComponent,
        data: { titulo: 'Usuarios de la aplicación' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRouterModule {}
