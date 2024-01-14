import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicalModel } from 'src/app/models/medical';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicalService } from 'src/app/services/medical.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicalForm: FormGroup;
  public hopitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: MedicalModel;
  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicalService: MedicalService,
    private ActivateRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.ActivateRoute.snapshot.params['id'];
    if (id != 'nuevo') {
      this.getMedical(id);
    }

    this.hospitalService
      .getHospitals()
      .subscribe((hospitales) => (this.hopitales = hospitales));

    this.medicalForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
  }
  seleccionarHospital() {
    const { hospital } = this.medicalForm.value;
    this.hospitalSeleccionado = this.hopitales.find(
      (hospitalArr) => hospitalArr._id == hospital
    );
  }
  getMedical(id) {
    this.medicalService.getMedical(id).subscribe((medico) => {
      this.medicoSeleccionado = medico;
      this.hospitalSeleccionado = medico.hospital;

      const {
        name,
        hospital: { _id },
      } = medico;
      this.medicalForm.setValue({ name, hospital: _id });
    });
  }
  guardarMedico() {
    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicalForm.value,
        _id: this.medicoSeleccionado._id,
      };
      const { name } = this.medicalForm.value;
      this.medicalService.updateMedical(data).subscribe((resp) => {
        Swal.fire(
          'Medico Actualizado',
          `El medico ${name} fue actualizado correctamente`,
          'success'
        );
      });
    } else {
      this.medicalService
        .createMedical(this.medicalForm.value)
        .subscribe((resp: any) => {
          const { name } = this.medicalForm.value;
          if (resp.ok) {
            Swal.fire({
              title: 'Medico Creado',
              text: `Medico ${name} creado`,
              icon: 'success',
            }).then((resp) => {
              this.location.back();
            });
          }
        });
    }
  }
}
