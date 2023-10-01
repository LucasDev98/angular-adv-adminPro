import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
// import swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn')
  googleBtn!: ElementRef;
  formSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [localStorage.getItem('email') ? true : false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.googleInit();
  }
  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '1045472984470-ltpjbi7vqot0d60nh0mton0jnffpt327.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleCredentialResponse(response);
      },
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response) {
    // console.log('Encoded JWT ID token: ' + response.credential);
    this.authService.loginWithGoogle(response.credential).subscribe((data) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      });
    });
  }

  login() {
    // this.router.navigateByUrl('/')
    this.formSubmitted = true;
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
    this.formSubmitted = true;
    console.log(this.formSubmitted);
    this.authService.login(this.form.value).subscribe(
      (data) => {
        if (this.form.get('remember').value) {
          localStorage.setItem('email', this.form.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        Swal.fire({
          title: 'Hubo un error',
          icon: 'error',
          text: err.error.msg,
        });
        this.formSubmitted = false;
      }
    );
  }

  validarCampo(campo: string) {
    if (this.form.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
