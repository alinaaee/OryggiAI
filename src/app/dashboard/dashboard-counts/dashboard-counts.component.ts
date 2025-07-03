//ANGULAR IMPORTS
import { Component, Input } from '@angular/core';
import { CommonModule }      from '@angular/common';

// MATERIAL IMPORTS
import { MatIconModule }     from '@angular/material/icon';
  
@Component({
  selector: 'app-dashboard-counts',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard-counts.component.html',
  styleUrls: ['./dashboard-counts.component.css']
})
export class DashboardCountsComponent {
  @Input() latestDate = ''; 
  @Input() totalLogs = 0;
  @Input() totalAnomalies = 0;
  @Input() systemHealth = 0;
  @Input() logsChange = 0;
  @Input() anomaliesChange = 0;
  @Input() healthChange = 0;

  getTrendClass(metric: 'logs' | 'anomalies' | 'health'): string {
    if (metric === 'logs') {
      return this.logsChange > 0 ? 'text-success' : 'text-danger';
    }
    if (metric === 'anomalies') {
      return this.anomaliesChange < 0 ? 'text-success' : 'text-danger';
    }
    if (metric === 'health') {
      return this.healthChange > 0 ? 'text-success' : 'text-danger';
    }
    return '';
  }
}
