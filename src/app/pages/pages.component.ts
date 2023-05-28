import { Component } from '@angular/core';
import { AccountSettingService } from '../services/account-setting.service';
declare function customInitProperties();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent {


  constructor( private accountSettingService : AccountSettingService ) {
    customInitProperties();
  }
}
