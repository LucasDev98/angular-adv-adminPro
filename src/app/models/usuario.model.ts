import { environment } from 'src/environments/environment.dev';

const base_url = environment.url;
export class UsuarioModel {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password?: string,
    public img?: string,
    public role?: string,
    public google?: Boolean,
    public uid?: string
  ) {}

  get imgUrl() {
    if (this.img.includes('https')) {
      return this.img;
    }
    if (this.img) {
      return `${base_url}/uploads/users/${this.img}`;
    } else {
      return `${base_url}/uploads/users/no-image`;
    }
  }
}
