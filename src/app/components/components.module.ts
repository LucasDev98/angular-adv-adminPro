import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations:[
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ],
  imports:[],
  exports:[
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ]
})


export class ComponentsModule {

}