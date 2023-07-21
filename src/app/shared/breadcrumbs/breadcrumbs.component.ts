import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map, pipe } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo$ : Subscription;
  titulo : string = '';



  constructor( private router : Router ){
    this.titulo$ = this.getNamePages().subscribe(
      ( { titulo } ) =>{
      this.titulo = titulo
      document.title = `Dashboard - ${ titulo }`;

    })
    this.getNamePages()
  }

  ngOnDestroy(): void {
    this.titulo$.unsubscribe()
  }

  getNamePages() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( ( event : ActivationEnd ) => event.snapshot.firstChild == null ),
      map( event => event.snapshot.data )
    )
  }
}
