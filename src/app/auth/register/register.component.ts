import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group(
    {
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [false, Validators.required],
    },
    {
      validators: this.passwordEquales('password', 'password2'),
    }
  );

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }
    this.authService.crearUsuario(this.form.value).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err.error.msg);
        Swal.fire({
          title: 'Hubo un error',
          icon: 'error',
          text: err.error.msg,
        });
      }
    );
  }

  validarCampo(campo: string): boolean {
    if (this.form.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptarTerminos() {
    return !this.form.get('terms').value && this.formSubmitted;
  }

  passwordEquales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const passControl1 = formGroup.controls[pass1Name];
      const passControl2 = formGroup.controls[pass2Name];

      if (passControl1.value === passControl2.value) {
        passControl2.setErrors(null);
      } else {
        passControl2.setErrors({ noEsIgual: true });
      }
    };
  }

  passowrdsNotAreEquals() {
    const pass1 = this.form.get('password').value;
    const pass2 = this.form.get('password2').value;

    if (pass1 != pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
