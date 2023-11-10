import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updateImage(
    archivo: File,
    tipo = 'user' || 'hospitals' || 'medicals',
    id
  ) {
    const url = `${base_url}/uploads/${tipo}/${id}`;
    try {
      const formData = new FormData();
      formData.append('img', archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await resp.json();
      if (resp.status == 200) {
        return data;
      } else {
        return data.msg;
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
