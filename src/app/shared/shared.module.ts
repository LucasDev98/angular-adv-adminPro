import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';




@NgModule({
  declarations:[
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports:[
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ]
})


export class SharedModule {

}
