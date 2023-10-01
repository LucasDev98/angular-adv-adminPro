import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterUser } from '../interfaces/register-form.interface';

import { environment } from 'src/environments/environment.dev';
import { loginUser } from '../interfaces/login-form.interface';
import { tap, map, catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${this.url}/login/renew`, { headers: { 'x-token': token } })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        }),
        map((res) => true),
        catchError((error) => of(false))
      );
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
