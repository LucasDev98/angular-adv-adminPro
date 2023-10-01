import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRouterModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  //Main Routes
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRouterModule, AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
