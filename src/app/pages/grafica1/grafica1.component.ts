import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {
    labelLocales : string [] = ['Blanca', 'Victoria', 'Elena']
    dataSetsLocales : any [] = [
      {
        data : [ 54000, 35000, 68000  ],
        backgroundColor: ['#FFB1C1', '#e1e1e1', '#333333'],
      }
    ]
}
