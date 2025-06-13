import { Component, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule,ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexFill } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill
};

@Component({
  selector: 'app-anomaly-severity',
  imports: [NgApexchartsModule],
  templateUrl: './anomaly-severity.component.html',
  styleUrl: './anomaly-severity.component.css'
})

export class AnomalySeverityComponent {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43],
      fill: { type: "solid", colors: ["#F7E100", "#000000", "#8F8F8F", "#E3E3E3"] },
      chart: {type: "donut"},
      labels: ["Critical", "High", "Medium", "Low"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 50
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
