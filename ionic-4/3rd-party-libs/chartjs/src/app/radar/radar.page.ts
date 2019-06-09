import {Component} from '@angular/core';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.page.html',
  styleUrls: ['./radar.page.scss'],
})
export class RadarPage {

  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];

  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];

  public radarChartType = 'radar';

}
