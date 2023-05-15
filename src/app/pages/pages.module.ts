import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { PagesRouterModule } from './pages.routing';

//PAGES
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations:[
    DashboardComponent,
    PagesComponent,
    Grafica1Component,
    ProgressComponent
  ],
  imports:[
    ComponentsModule,
    PagesRouterModule
  ],
  exports:[
    DashboardComponent,
    PagesComponent,
    Grafica1Component,
    ProgressComponent
  ]
})


export class PagesModule {

}
