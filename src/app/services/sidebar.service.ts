import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Principal',
      icon: 'mdi mdi-gauge',
      subMenuItems: [
        { titulo: 'main', url: '/' },
        { titulo: 'Progress Bar', url: 'progress' },
        { titulo: 'Graphs', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ],
    },
    {
      titulo: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      subMenuItems: [
        { titulo: 'Usuarios', url: 'users' },
        { titulo: 'Doctores', url: 'doctors' },
        { titulo: 'hospitales', url: 'hospitals' },
      ],
    },
  ];
  constructor() {}
}
