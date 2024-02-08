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

  /**---CRUD HOSPITAL---**/
  createHospital(name: string) {
    const url = `${base_url}/hospitals`;

    return this.http.post(url, { name: name, img: 'no-image' });
  }
  getHospitals() {
    const url = `${base_url}/hospitals`;

    return this.http.get(url).pipe(
      map((resp: { ok: true; hospitals: Hospital[] }) => {
        return resp.hospitals;
      })
    );
  }

  UpdateHospital(_id, name) {
    const url = `${base_url}/hospitals/${_id}`;

    return this.http.put(url, { name });
  }

  DeleteHospital(_id) {
    const url = `${base_url}/hospitals/${_id}`;

    return this.http.delete(url);
  }
}
