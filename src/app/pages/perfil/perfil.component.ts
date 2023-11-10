import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public img_temp: any = null;
  public usuario: UsuarioModel;
  public imgProfile: File;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = authService.user;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [this.usuario.name, [Validators.required, Validators.minLength(3)]],
      lastName: [
        this.usuario.lastName,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.authService.actualizarPerfil(this.perfilForm.value).subscribe(
      (data: any) => {
        console.log(data);
        const { name, lastName, email } = this.perfilForm.value;
        this.usuario.name = name;
        this.usuario.lastName = lastName;
        this.usuario.email = email;

        Swal.fire({
          icon: 'success',
          text: data.msg,
          title: 'Correcto',
        });
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: err.error.msg,
          title: 'Error',
        });
      }
    );
  }
  getImage(file: File) {
    console.log('hola');
    console.log(file);
    if (!file) {
      // console.log('hola');
      this.img_temp = null;
      return;
    }
    console.log('hola');
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      this.img_temp = reader.result;
    };
  }

  updateImage() {
    this.fileUploadService
      .updateImage(this.imgProfile, 'users', this.usuario.uid)
      .then((resp) => {
        console.log(resp);
        this.usuario.img = resp.fileName;
        Swal.fire({
          icon: 'success',
          text: resp.msg,
          title: 'Success',
        });
      });
  }
}
