import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';



import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonutComponent } from './donut/donut.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent
  ],
  imports: [
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncrementadorComponent,
    DonutComponent
  ]
})
export class ComponentsModule { }
