import { environment } from 'src/environments/environment.dev';

const base_url = environment.url;
export class UsuarioModel {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public img?: string,
    public password?: string,
    public role?: string,
    public google?: Boolean,
    public uid?: string
  ) {}

  get imgUrl() {
    let pathImg = '';
    // console.log(this.img);
    if (!this.img) {
      pathImg = `${base_url}/uploads/users/no-image`;
    } else if (this.img.includes('https')) {
      pathImg = this.img;
    } else {
      pathImg = `${base_url}/uploads/users/${this.img}`;
    }

    return pathImg;
  }
}
