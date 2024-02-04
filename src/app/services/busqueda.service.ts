import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';
import { MedicalModel } from '../models/medical';
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
  getModelHospital(results: Hospital[]) {
    return results.map(
      (hospital) =>
        new Hospital(
          hospital.name,
          hospital._id,
          hospital.img,
          hospital.usuario
        )
    );
  }
  getAllByTerm( termino ){
    const url = `${url_base}/search/${termino}`;
    return this.http.get(url, this.headers);
  }
  getModelMedicals(results: MedicalModel[]) {
    return results.map(
      (medical) =>
        new MedicalModel(
          medical._id,
          medical.name,
          medical.user,
          medical.img,
          medical.hospital
        )
    );
  }
  searchByTerm(
    tipo = 'users' || 'hospitals' || 'medicals',
    termino: string
  ): any {
    const url = `${url_base}/search/collection/${tipo}/${termino}`;
    console.log(url);
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        console.log(resp.data);
        switch (tipo) {
          case 'users':
            return this.getModelUsers(resp.data);
          case 'hospitals':
            return this.getModelHospital(resp.data);
          case 'medicals':
            return this.getModelMedicals(resp.data);
          default:
            return [];
        }
      })
    );
  }
}
