import {Component} from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.page.html',
  styleUrls: ['./pie.page.scss'],
})
export class PiePage {

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];

  public pieChartData = [120, 150, 180, 90];

  public pieChartType = 'pie';
}
