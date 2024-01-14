import { Component, OnDestroy, OnInit } from '@angular/core';

import { HospitalService } from 'src/app/services/hospital.service';

import { Hospital } from 'src/app/models/hospital.model';

import Swal from 'sweetalert2';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { Subscription, delay } from 'rxjs';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  hospitals: Hospital[];
  loading: boolean = true;
  totalHospitals: number;
  hospital_temp: Hospital[] = [];
  $imagenSub: Subscription;

  constructor(
    private hospitalsService: HospitalService,
    private searchService: BusquedaService,
    private modalService: ModalServiceService
  ) {}
  ngOnInit() {
    this.showHospital();

    this.$imagenSub = this.modalService.nuevaImagen
      .pipe(delay(200))
      .subscribe((data) => this.showHospital());
  }
  ngOnDestroy(): void {
    this.$imagenSub.unsubscribe();
  }

  showHospital() {
    this.loading = true;
    this.hospitalsService.getHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.totalHospitals = hospitals.length;
      this.hospital_temp = hospitals;
      this.hospitals = hospitals;
    });
  }
  async createHospital() {
    const { value: nameHospital } = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'Ingrese nombre del hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    if (nameHospital.trim().length > 0) {
      this.hospitalsService
        .createHospital(nameHospital)
        .subscribe((resp: any) => {
          if (resp.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: `Hospital ${resp.hospital.name} creado exitosamente!`,
            });
          }
          this.showHospital();
        });
    }
  }
  findHospital(term: string) {
    if (term.trim().length == 0) {
      this.hospitals = this.hospital_temp;
    } else {
      this.searchService.searchByTerm('hospitals', term).subscribe((resp) => {
        // console.log(resp);
        this.hospitals = resp;
      });
    }
  }
  updateHospital(hospital: Hospital) {
    if (hospital.name.length != 0) {
      this.hospitalsService
        .UpdateHospital(hospital._id, hospital.name)
        .subscribe((resp) => {
          Swal.fire({
            icon: 'success',
            text: 'Hospital actualizado',
            title: 'Exito',
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        text: 'No se puede actualizar un registro vacio',
        title: 'Error',
      });
    }
  }
  deleteHospital(hospital: Hospital) {
    this.hospitalsService
      .DeleteHospital(hospital._id)
      .subscribe((resp: any) => {
        if (resp.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: `Hospital ${hospital.name} borrado con exito`,
          });

          this.showHospital();
        }
      });
  }

  cambiarImagen(hospital: Hospital) {
    console.log(hospital);
    console.log(hospital.img);
    this.modalService.openModal('hospitals', hospital.img, hospital._id);
  }
}
