import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicalModel } from 'src/app/models/medical';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit{
  usuarios : UsuarioModel [] = [];
  hospitales : Hospital [] = [];
  medicos : MedicalModel [] = [];
  constructor( private activateRoute : ActivatedRoute, private busquedaService : BusquedaService ){

  }

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe( ( {termino} )=> this.mostrarResultados(termino))
    
  }

  mostrarResultados( termino : string ) {
    this.busquedaService.getAllByTerm(termino).subscribe( (resp : any ) => {
      console.log(resp)
      this.usuarios = resp.users;
      this.hospitales = resp.hospitals;
      this.medicos = resp.medicals;
    })
  }
}
