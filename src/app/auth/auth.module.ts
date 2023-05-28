import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations:[
    LoginComponent,
    RegisterComponent
  ],
  imports:[
    FormsModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})





export class AuthModule {

}
