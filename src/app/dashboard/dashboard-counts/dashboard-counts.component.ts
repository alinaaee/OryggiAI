import { Component, Input } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { MatIconModule }     from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-counts',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard-counts.component.html',
  styleUrls: ['./dashboard-counts.component.css']
})
export class DashboardCountsComponent {
  /** number of logs processed */
  @Input() totalLogs = 0;

  /** number of anomalies detected */
  @Input() totalAnomalies = 0;
}
