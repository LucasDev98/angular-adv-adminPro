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

  
 
  getMedicals() {
    const url = `${base_url}/medicals`;
    return this.http.get(url).pipe(
      map((resp: { ok: true; medicals: MedicalModel[] }) => {
        return resp.medicals;
      })
    );
  }
  getMedical(id: string) {
    const url = `${base_url}/medicals/${id}`;

    return this.http
      .get(url)
      .pipe(
        map((resp: { ok: boolean; medical: MedicalModel }) => resp.medical)
      );
  }

  createMedical(medical: { name; hospital_id }) {
    const url = `${base_url}/medicals`;

    return this.http.post(url, medical);
  }
  deleteMedical(id: string) {
    const url = `${base_url}/medicals/${id}`;
    return this.http.delete(url);
  }
  updateMedical(medical: MedicalModel) {
    const url = `${base_url}/medicals/${medical._id}`;

    return this.http.put(url, medical);
  }
}
