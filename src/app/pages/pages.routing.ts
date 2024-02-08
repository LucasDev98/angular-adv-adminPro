import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Pages
import { PagesComponent } from './pages.component';




// GUARDS
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  //Protected Routes
  {
    path: 'dashboard',
    component: PagesComponent,
    canLoad:[AuthGuard],
    canActivate: [AuthGuard],
    loadChildren : () => import('../../app/pages/child-routes.module').then( m => m.ChildRoutesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRouterModule {}
