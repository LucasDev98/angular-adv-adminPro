import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private usuarioService : AuthService, private router : Router ) {

  }
  canActivate( ): boolean{
    
    if( this.usuarioService.role !== 'ADMIN_ROLE'){
      console.log('no te dejare pasar')
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
  
}
