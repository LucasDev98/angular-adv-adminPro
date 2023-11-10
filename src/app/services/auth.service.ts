import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterUser } from '../interfaces/register-form.interface';

import { environment } from 'src/environments/environment.dev';
import { loginUser } from '../interfaces/login-form.interface';
import { tap, map, catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';

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

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${this.url}/login/renew`, { headers: { 'x-token': this.token } })
      .pipe(
        tap((res: any) => {
          console.log(res);
          const {
            name,
            lastName,
            email,
            password = '',
            img,
            role,
            google,
            uid,
          } = res.user;
          this.user = new UsuarioModel(
            name,
            lastName,
            email,
            password,
            img,
            role,
            google,
            uid
          );
          localStorage.setItem('token', res.token);
        }),
        map((res) => true),
        catchError((error) => of(false))
      );
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  actualizarPerfil(data: {
    name: string;
    lastName: string;
    role: string;
    email: string;
  }) {
    data = { ...data, role: this.user.role };
    return this.http.put(`${this.url}/usuarios/${this.user.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }
  logOut() {
    if (localStorage.getItem('googleEmail')) {
      console.log(localStorage.getItem('googleEmail'));
      google.accounts.id.revoke(localStorage.getItem('googleEmail'), () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('auth/login');
        });
      });
    }
    this.router.navigateByUrl('auth/login');
  }

  crearUsuario(formData: RegisterUser) {
    //RegisterUser contiene lo necesario para registrar un usuario
    return this.http.post(`${this.url}/usuarios`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  login(formData: loginUser) {
    //loginUser contiene la data necesaria para el login
    return this.http.post(`${this.url}/login`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  loginWithGoogle(token) {
    console.log(token);
    return this.http.post(`${this.url}/login/google`, { token }).pipe(
      tap((res: any) => {
        console.log(res);
        localStorage.setItem('googleEmail', res.user.email);
        localStorage.setItem('token', res.token);
      })
    );
  }
}
