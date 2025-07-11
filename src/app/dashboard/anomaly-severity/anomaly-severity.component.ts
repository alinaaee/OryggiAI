// src/app/dashboard/anomaly-severity/anomaly-severity.component.ts
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartComponent, NgApexchartsModule, ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexFill, ApexLegend, ApexPlotOptions, ApexDataLabels} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  fill: ApexFill;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-anomaly-severity',
  standalone: true,
  imports: [NgApexchartsModule, MatCardModule],
  templateUrl: './anomaly-severity.component.html',
  styleUrls: ['./anomaly-severity.component.css']
})
export class AnomalySeverityComponent implements OnChanges {
  @Input() series: number[] = [0, 0, 0, 0];
  @ViewChild('chart') chart!: ChartComponent;

  public chartOptions: ChartOptions = {
    series: this.series,
    chart: {
      type: 'donut',
      toolbar: { show: false }
    },
    labels: ['Critical', 'High', 'Medium', 'Low'],
    fill: {
      colors: ["#E3E3E3", "#000000", "#8F8F8F", "#F7E100"] 
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',        
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 600,
              formatter: (val) => `${Number(val).toFixed(0)}%`
            },
            total: {
              show: false
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,

    formatter: (val, opts) => `${Number(val).toFixed(0)}%`,
      dropShadow: { enabled: false }
    },
    legend: {
      position: 'right',
      offsetY: 0,
      itemMargin: { horizontal: 8 }
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          legend: { position: 'bottom' },
          plotOptions: {
            pie: { donut: { size: '10%' } }  
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          legend: { position: 'bottom' },
          plotOptions: {
            pie: { donut: { size: '55%' } }
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          legend: { position: 'bottom' },
          plotOptions: {
            pie: { donut: { size: '50%' } }
          }
        }
      }
    ]
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['series'] && !changes['series'].isFirstChange()) {
      this.chartOptions = { ...this.chartOptions, series: this.series };
    }
  }
}
