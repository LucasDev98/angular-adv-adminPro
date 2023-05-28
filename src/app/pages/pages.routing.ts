import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';



const routes : Routes = [
   //Protected Routes
   {path:'dashboard',
   component: PagesComponent,
   children:[
     { path:'', component:DashboardComponent },
     { path:'grafica1', component:Grafica1Component },
     { path:'progress', component:ProgressComponent },
     { path:'account-setting', component:AcountSettingComponent },
   ],
  }
]

@NgModule({

 imports:[RouterModule.forChild( routes )],
 exports:[RouterModule]
})


export class PagesRouterModule {}
