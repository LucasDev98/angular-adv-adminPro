import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
const base_url = environment.url;

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'users' | 'hospitals' | 'medicals'): string {
    console.log(img);
    let pathImg = '';
    // console.log(this.img);
    if (!img) {
      pathImg = `${base_url}/uploads/${tipo}/no-image`;
    } else if (img.includes('https')) {
      pathImg = img;
    } else {
      pathImg = `${base_url}/uploads/${tipo}/${img}`;
    }
    console.log(pathImg);
    return pathImg;
  }
}
