import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent  {
    public url : string = 'https://reqres.in/api/users?page=2'

    constructor() {
      this.getUsuarios().then( ( data : any ) => {
        console.log( data.data )
      })
    }
    // constructor(){

    //   const promesa = new Promise( ( resolve, reject ) => {

    //       setTimeout(()=> {
    //         resolve('promise Success')
    //       },3000)
    //   })


    //   promesa.then(  ( resp )=> {
    //     console.log( resp )
    //   }).catch( err =>  console.log( err ))
    // }


    getUsuarios () {

        return new Promise( ( resolve ) => {

              fetch( this.url )
                .then( resp =>  resp.json() )
                .then( data => resolve( data ) )
        })
    }
}
