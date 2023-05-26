import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//PagesModule
import { PagesModule } from './pages/pages.module';
//AuthModule
import { AuthModule } from './auth/auth.module';
//Not Page Found
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
