import { Component } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public profile: UsuarioModel;
  constructor(private authService: AuthService) {
    this.profile = this.authService.user;
    console.log('desde aqui');
    console.log(this.profile);
  }

  logOut() {
    this.authService.logOut();
  }
}
