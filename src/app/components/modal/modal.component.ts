import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  public img_temp: any = null;
  public imagenASubir: File;
  constructor(
    public modalService: ModalServiceService,
    private fileUploadService: FileUploadService
  ) {}

  getImage(file: File) {
    if (!file) {
      // console.log('hola');
      this.img_temp = null;
      return;
    }
    this.imagenASubir = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      this.img_temp = reader.result;
    };
  }
  cerrarModal() {
    this.img_temp = null;
    this.modalService.closeModal();
  }

  updateImage() {
    const id = this.modalService.id;
    const tipo = this.modalService.tipo;
    this.fileUploadService
      .updateImage(this.imagenASubir, tipo, id)
      .then((resp) => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          text: resp.msg,
          title: 'Success',
        });
        this.modalService.nuevaImagen.emit(resp);
        this.cerrarModal();
      });
  }
}
