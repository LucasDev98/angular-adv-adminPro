import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  public img: string = '';
  public tipo: 'users' | 'hospitals' | 'medicals';
  public id: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  private showModal: boolean = false;

  get mostrarModal() {
    return this.showModal;
  }

  openModal(tipo, img, id) {
    this.id = id;
    this.tipo = tipo;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${tipo}/${img}`;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
