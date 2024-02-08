import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterUser } from '../interfaces/register-form.interface';

import { environment } from 'src/environments/environment.dev';
import { loginUser } from '../interfaces/login-form.interface';
import { tap, map, catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { ResponseUsuarios } from '../interfaces/response-usuarios.interface';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.url;
  public user: UsuarioModel;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}


  dataLocalStorage( token : string, menu : any ) {
    //Aca se almacenará  el token y el menu
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }
  validarToken(): Observable<boolean> {
    return this.http
      .get(`${this.url}/login/renew`, { headers: { 'x-token': this.token } })
      .pipe(
        tap((response: any) => {
       
          const {
            name,
            lastName,
            email,
            img,
            password = '',
            role,
            google,
            uid,
          } = response.user;
          this.user = new UsuarioModel(
            name,
            lastName,
            email,
            img,
            password,
            role,
            google,
            uid
          );
          this.dataLocalStorage(response.token, response.menu);
        }),
        map((res) => true),
        catchError((error) => of(false))
      );
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get role () : 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.user.role;
  }


  actualizarPerfil(data: {
    name: string;
    lastName: string;
    role: string;
    email: string;
  }) {
    data = { ...data, role: this.user.role };
    return this.http.put(
      `${this.url}/usuarios/${this.user.uid}`,
      data,
      // this.headers
    );
  }
  logOut() {
    if (localStorage.getItem('googleEmail')) {
      console.log(localStorage.getItem('googleEmail'));
      google.accounts.id.revoke(localStorage.getItem('googleEmail'), () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('auth/login');
          localStorage.removeItem('menu');
          localStorage.removeItem('token');
        });
      });
    }
    localStorage.removeItem('menu');
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }

  crearUsuario(formData: RegisterUser) {
    //RegisterUser contiene lo necesario para registrar un usuario
    return this.http.post(`${this.url}/usuarios`, formData).pipe(
      tap((response: any) => {
        this.dataLocalStorage(response.token, response.menu);
 
      })
    );
  }

  login(formData: loginUser) {
    //loginUser contiene la data necesaria para el login
    return this.http.post(`${this.url}/login`, formData).pipe(
      tap((response: any) => {
        this.dataLocalStorage(response.token, response.menu);
      })
    );
  }

  loginWithGoogle(token) {
    console.log(token);
    return this.http.post(`${this.url}/login/google`, { token }).pipe(
      tap((response: any) => {
        this.dataLocalStorage(response.token, response.menu);
        localStorage.setItem('googleEmail', response.user.email);
        
      })
    );
  }

  getUsuarios(desde: number = 0) {
    const url = `${this.url}/usuarios?from=${desde}`;
    return this.http.get<ResponseUsuarios>(url).pipe(
      map((resp) => {
        console.log(resp);
        const users = resp.users.map(
          (user) =>
            new UsuarioModel(
              user.name,
              user.lastName,
              user.email,
              user.img,
              '',
              user.role,
              user.google,
              user.uid
            )
        );

        return {
          users,
          total: resp.total,
        };
      })
    );
  }

  deleteUser(id) {
    return this.http.delete(`${this.url}/usuarios/${id}`);
  }

  updateRole(usuario: UsuarioModel) {
    // data = { ...data, role: this.user.role };
    return this.http.put(
      `${this.url}/usuarios/${usuario.uid}`,
      usuario
    );
  }
}
