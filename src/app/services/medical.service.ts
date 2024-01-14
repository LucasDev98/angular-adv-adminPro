import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { MedicalModel } from '../models/medical';

const base_url = environment.url;
@Injectable({
  providedIn: 'root',
})
export class MedicalService {
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
  getMedicals() {
    const url = `${base_url}/medicals`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: true; medicals: MedicalModel[] }) => {
        return resp.medicals;
      })
    );
  }
  getMedical(id: string) {
    const url = `${base_url}/medicals/${id}`;

    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; medical: MedicalModel }) => resp.medical)
      );
  }

  createMedical(medical: { name; hospital_id }) {
    const url = `${base_url}/medicals`;

    return this.http.post(url, medical, this.headers);
  }
  deleteMedical(id: string) {
    const url = `${base_url}/medicals/${id}`;
    return this.http.delete(url, this.headers);
  }
  updateMedical(medical: MedicalModel) {
    const url = `${base_url}/medicals/${medical._id}`;

    return this.http.put(url, medical, this.headers);
  }
}
