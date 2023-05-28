import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRouterModule } from './pages.routing';
import { FormsModule } from '@angular/forms';


//MODULES
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

//PAGES
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';



@NgModule({
  declarations:[
    DashboardComponent,
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    AcountSettingComponent
  ],
  imports:[
    ComponentsModule,
    FormsModule,
    SharedModule,
    PagesRouterModule,
    CommonModule

  ],
  exports:[
    DashboardComponent,
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    AcountSettingComponent
  ]
})


export class PagesModule {

}
