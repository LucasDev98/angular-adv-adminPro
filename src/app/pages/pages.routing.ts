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
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

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
        path:'busqueda/:termino',
        component: BusquedaComponent,
        data : { titulo : 'Busqueda' }
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
        canActivate : [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: 'Usuarios de la aplicación' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'medicos de la aplicación' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Medico' },
      },

      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Hospitales de la aplicación' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRouterModule {}
