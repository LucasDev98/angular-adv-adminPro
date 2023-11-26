import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonutComponent } from './donut/donut.component';
import { ModalComponent } from './modal/modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [IncrementadorComponent, DonutComponent, ModalComponent],
  imports: [FormsModule, NgChartsModule, CommonModule],
  exports: [IncrementadorComponent, DonutComponent, ModalComponent],
})
export class ComponentsModule {}
