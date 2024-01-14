import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public users: UsuarioModel[] = [];
  public currentValue = 0;
  public users_temp: any[] = [];
  public loading: boolean = true;
  public $subImg: Subscription;
  constructor(
    private authService: AuthService,
    private busqueda: BusquedaService,
    private modalService: ModalServiceService
  ) {}

  ngOnInit(): void {
    this.showUsers();

    this.$subImg = this.modalService.nuevaImagen
      .pipe(delay(100))
      .subscribe((data) => this.showUsers());
  }

  ngOnDestroy(): void {
    this.$subImg.unsubscribe();
  }

  showUsers() {
    this.loading = true;
    this.authService
      .getUsuarios(this.currentValue)
      .subscribe(({ total, users }) => {
        this.loading = false;
        this.totalUsuarios = total;
        this.users = users;
        this.users_temp = users;
      });
  }

  paginator(valor) {
    this.currentValue += valor;
    console.log(this.currentValue);

    if (this.currentValue >= this.totalUsuarios) {
      this.currentValue -= valor;
    } else if (this.currentValue <= 0) {
      this.currentValue = 0;
    }
    console.log(this.currentValue);
    this.showUsers();
  }

  findUsers(term: string) {
    if (term.length == 0) {
      this.users = this.users_temp;
    }
    this.busqueda.searchByTerm('users', term).subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(user: UsuarioModel) {
    if (user.uid === this.authService.user.uid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puede realizar esta accion',
      });

      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(user.uid).subscribe((data: any) => {
          Swal.fire({
            title: 'Deleted!',
            text: data.msg,
            icon: 'success',
          });

          this.showUsers();
        });
      }
    });
  }

  updateRole(user) {
    this.authService.updateRole(user).subscribe((data) => {
      console.log(data);
    });
  }

  cambiarImagen(usuario: UsuarioModel) {
    console.log(usuario);
    this.modalService.openModal('users', usuario.img, usuario.uid);
  }
}
