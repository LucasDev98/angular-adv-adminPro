import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingService {
  url = './assets/css/colors';
  defaultTheme = 'purple-dark.css'
  linkElement  = document.querySelector('#theme');

  constructor() {
      if( localStorage.getItem('theme') ){
        let color = localStorage.getItem('theme')
        this.linkElement.setAttribute('href', `${this.url}/${color}.css`);
      }else {
        this.linkElement.setAttribute('href', `${this.url}/${this.defaultTheme}`)
      }
  }

  changeColor( event : any ) {
    let items : NodeListOf <Element> = document.querySelectorAll('a.selector')
     items.forEach( item => {
      item.classList.remove('working');
    })

    let elemento = event.target;
    elemento.classList.add('working');

    let color = elemento.getAttribute('data-theme');


    this.linkElement.setAttribute('href', `./assets/css/colors/${color}.css` )
    localStorage.setItem('theme', color );
  }

  changeCurrentLs() {
    let items = document.querySelectorAll('a.selector');
    if( localStorage.getItem('theme') ){

      let color = localStorage.getItem('theme');
      this.linkElement.setAttribute('href', `./assets/css/colors/${color}.css`)
      items.forEach( item => {
        if( item.getAttribute('data-theme') == color ){
          item.classList.add('working')

        }

      })

    }
  }
}
