import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagesComponent } from './pages/pages.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';

const routes: Routes = [
   //Main Routes
     {
      path:'login', component:LoginComponent
     },
     {
      path:'register', component: RegisterComponent
     },
      //Childres Routes
      {
        //Protected Routes
        path:'',
        component: PagesComponent,
        children:[
          {
            path:'', pathMatch:'full', redirectTo:'/dashboard'
          },
          {
            path:'dashboard', component:DashboardComponent
          },
          {
            path:'grafica1', component:Grafica1Component
          },
          {
            path:'progress', component:ProgressComponent
          },
          {
            path:'**', component:PageNotFoundComponent
          },
        ],
      },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
