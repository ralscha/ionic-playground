import {Component} from '@angular/core';
import {ChartData, ChartType} from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.page.html',
  styleUrls: ['./doughnut.page.scss'],
})
export class DoughnutPage {

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
      { data: [ 50, 150, 120 ] },
      { data: [ 250, 130, 70 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

}
