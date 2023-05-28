import { Component, AfterViewInit} from '@angular/core';
import { AccountSettingService } from 'src/app/services/account-setting.service';

@Component({
  selector: 'app-acount-setting',
  templateUrl: './acount-setting.component.html',
  styleUrls: ['./acount-setting.component.css']
})
export class AcountSettingComponent implements AfterViewInit {

    public linktElement = document.querySelector('#theme');
    public items;
    constructor( private accountSettingService : AccountSettingService ) {

    }
    ngAfterViewInit() :void {
      this.accountSettingService.changeCurrentLs();
    }


  changeColor( event : any ){

    this.accountSettingService.changeColor( event );
  }


}
