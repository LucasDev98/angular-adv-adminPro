import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment.dev';
import { Hospital } from '../models/hospital.model';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  /**---CRUD HOSPITAL---**/
  createHospital(name: string) {
    const url = `${base_url}/hospitals`;

    return this.http.post(url, { name: name, img: 'no-image' }, this.headers);
  }
  getHospitals() {
    const url = `${base_url}/hospitals`;

    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: true; hospitals: Hospital[] }) => {
        return resp.hospitals;
      })
    );
  }

  UpdateHospital(_id, name) {
    const url = `${base_url}/hospitals/${_id}`;

    return this.http.put(url, { name }, this.headers);
  }

  DeleteHospital(_id) {
    const url = `${base_url}/hospitals/${_id}`;

    return this.http.delete(url, this.headers);
  }
}
