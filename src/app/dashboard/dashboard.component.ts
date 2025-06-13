import { Component } from '@angular/core';
import { DashboardCountsComponent } from "./dashboard-counts/dashboard-counts.component";
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnomalySeverityComponent } from "./anomaly-severity/anomaly-severity.component";
import { RecentAnomaliesComponent } from "./recent-anomalies/recent-anomalies.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCountsComponent, MatButtonModule, MatIconModule, AnomalySeverityComponent, RecentAnomaliesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
