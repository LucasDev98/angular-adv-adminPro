import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu : any [] = [
    {
      titulo : 'Principal',
      icon : 'mdi mdi-gauge',
        subMenuItems : [
          { titulo : 'main', url : '/' },
          { titulo : 'Progress Bar', url : 'progress' },
          { titulo : 'Graphs', url : 'grafica1' },
        ]
    }
  ]
  constructor() { }
}
