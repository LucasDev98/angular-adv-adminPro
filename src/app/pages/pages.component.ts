import { Component } from '@angular/core';
import { AccountSettingService } from '../services/account-setting.service';
import { SidebarService } from '../services/sidebar.service';
declare function customInitProperties();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {


  constructor( private accountSettingService : AccountSettingService, private sidebarService : SidebarService ) {
    this.sidebarService.cargarMenu();
    customInitProperties();
  }
}
