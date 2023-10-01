import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [ReactiveFormsModule, RouterModule, CommonModule, HttpClientModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
