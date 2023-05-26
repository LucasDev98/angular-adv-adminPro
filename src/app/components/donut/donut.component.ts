import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType} from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent  implements OnInit{
  // Doughnut
  @Input()Titulo : string = 'Sin titutlo';
  @Input()Labels : string [] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ]
  @Input()dataSets : any []  = [
      { data: [ 350,160, 145 ],
        backgroundColor: ['#FFB1C1', '#e1e1e1', '#333333'],
      }
    ]
   ngOnInit(): void {
     this.doughnutChartData.labels = this.Labels;
     this.doughnutChartData.datasets = this.dataSets;
   }

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.Labels,
    datasets: this.dataSets,
  };
  public doughnutChartType: ChartType = 'doughnut';

}
