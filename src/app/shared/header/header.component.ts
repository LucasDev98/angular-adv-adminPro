import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public profile: UsuarioModel;
  constructor(private authService: AuthService, private router : Router) {
    this.profile = this.authService.user;
    console.log('desde aqui');
    console.log(this.profile);
  }

  logOut() {
    this.authService.logOut();
  }

  busqueda( termino ){
    if(termino.length < 1 ) {
      return
    }

   this.router.navigateByUrl(`/dashboard/busqueda/${termino}`);
  }
}
