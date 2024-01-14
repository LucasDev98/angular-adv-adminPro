import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { MedicalModel } from 'src/app/models/medical';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicalService } from 'src/app/services/medical.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit, OnDestroy {
  totalMedicals: number;
  medicals: MedicalModel[] = [];
  medicals_temp: MedicalModel[] = [];

  loading: boolean = false;
  $imgSubs: Subscription;

  constructor(
    private medicalService: MedicalService,
    private modalService: ModalServiceService,
    private searchService: BusquedaService
  ) {}

  ngOnInit(): void {
    this.showMedicals();

    this.$imgSubs = this.modalService.nuevaImagen
      .pipe(delay(200))
      .subscribe((resp) => this.showMedicals());
  }

  ngOnDestroy(): void {
    this.$imgSubs.unsubscribe();
  }

  createMedical() {}

  cambiarImagen(medico: MedicalModel) {
    const noImg = medico.img;
    console.log(medico);
    this.modalService.openModal(
      'medicals',
      medico.img || 'no-image',
      medico._id
    );
  }

  deleteMedical(medico: MedicalModel) {
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
        this.medicalService.deleteMedical(medico._id).subscribe((resp) => {
          console.log(resp);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
          this.showMedicals();
        });
      }
    });
  }

  findMedical(term: string) {
    if (term.length == 0) {
      this.medicals = this.medicals_temp;
    } else {
      this.searchService.searchByTerm('medicals', term).subscribe((resp) => {
        this.medicals = resp;
      });
    }
  }
  showMedicals() {
    this.medicalService.getMedicals().subscribe((resp) => {
      this.medicals_temp = resp;
      this.medicals = resp;
    });
  }
}
