import {Component} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from 'chart.js';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.page.html',
  styleUrls: ['./pie.page.scss'],
})
export class PiePage {

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
}
