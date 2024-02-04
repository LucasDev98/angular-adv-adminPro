import { Component, OnDestroy } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
 public menu : any;
  public profile: UsuarioModel;
  constructor(
    public sidebarService: SidebarService,
    private autService: AuthService
  ) {
   
    this.profile = autService.user;

  }

 
  logout() {
    this.autService.logOut();
  }
}
