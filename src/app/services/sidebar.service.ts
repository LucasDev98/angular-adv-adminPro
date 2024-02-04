import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService{
  menu: any = [

  ];

  constructor() {
   
  }
  
  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
  

  
}
