import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs';
const url_base = environment.url;
@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(private http: HttpClient) {}

  get headers() {
    return {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    };
  }
  getModelUsers(results: UsuarioModel[]) {
    return results.map(
      (user) =>
        new UsuarioModel(
          user.name,
          user.lastName,
          user.email,
          '',
          user.img,
          user.role,
          user.google,
          user.uid
        )
    );
  }
  searchByTerm(tipo = 'users' || 'hospitals' || 'medicals', termino: string) {
    const url = `${url_base}/search/collection/${tipo}/${termino}`;
    console.log(url);
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        console.log(resp.data);
        switch (tipo) {
          case 'users':
            return this.getModelUsers(resp.data);

          default:
            return [];
        }
      })
    );
  }
}