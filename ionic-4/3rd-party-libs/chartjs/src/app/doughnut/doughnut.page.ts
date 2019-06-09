import {Component} from '@angular/core';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.page.html',
  styleUrls: ['./doughnut.page.scss'],
})
export class DoughnutPage {

  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];

  public doughnutChartData = [120, 150, 180, 90];

  public doughnutChartType = 'doughnut';

}
