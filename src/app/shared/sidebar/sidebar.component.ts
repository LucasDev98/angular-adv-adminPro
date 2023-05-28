import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public menu : any [];


  constructor( private sidebarService : SidebarService ) {
    this.menu = sidebarService.menu;


  }
}
