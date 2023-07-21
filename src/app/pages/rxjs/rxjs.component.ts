import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{

  public generaInervalo : Subscription;

  constructor() {

     this.generaInervalo = this.generaInterval().subscribe( console.log )
    }


    generaInterval () : Observable<number>{
      let intervalo$;
      return  intervalo$ = interval(1000)
    }

     ngOnDestroy(): void {
       this.generaInervalo.unsubscribe()
     }
}
