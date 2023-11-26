import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRouterModule } from './pages.routing';
import { FormsModule } from '@angular/forms';

//MODULES
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

//PAGES
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    AcountSettingComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
  ],
  imports: [
    ComponentsModule,
    FormsModule,
    SharedModule,
    PagesRouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    AcountSettingComponent,
    PromesasComponent,
  ],
})
export class PagesModule {}
