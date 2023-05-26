import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {
  @Input()progreso : number;
  @Input()colorBarra : string = 'bg-primary';
  @Output()cambiarProgreso : EventEmitter<number> = new EventEmitter();



  cambiarValor( valor : number ){

    if( this.progreso >= 100 && valor >= 0 ) {
      this.cambiarProgreso.emit(100);
      return this.progreso = 100;        }

    if( this.progreso <= 0 && valor < 0){
      this.cambiarProgreso.emit(0);
      return this.progreso = 0;
    }
    this.cambiarProgreso.emit(this.progreso + valor );
    return this.progreso = this.progreso + valor;

  }
  onChange( valor : number){


     if( valor > 100 ){
        return this.progreso = 100;
     }else if ( valor < 0 ){
      return this.progreso = 0;
     }

     return this.cambiarProgreso.emit( valor )
  }
}
