import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AgGridAngular }    from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-recent-anomalies',
  standalone: true,
  imports: [AgGridAngular, MatIconModule, MatFormFieldModule, MatSelectModule, MatChipsModule],
  templateUrl: './recent-anomalies.component.html',
  styleUrls: ['./recent-anomalies.component.css']
})
export class RecentAnomaliesComponent {
  @Input() rowData: any[] = [];
  getRowClass(params: any): string {
    return 'wrap-row';
  }
  
  columnDefs: ColDef[] = [
    { headerName: 'Timestamp', field: 'timestamp', sortable: true},
    { headerName: 'Log Source',  field: 'source',    sortable: true, cellRenderer: (params: ICellRendererParams) => { return `<strong>${params.value}</strong>`;}, width: 230 },
    {
      headerName: 'Severity', field: 'severity', width: 135,
      cellRenderer: (params: ICellRendererParams) => {
        const sev = (params.value || '').toString().toLowerCase();

        const classMap: Record<string, string> = {
          critical: 'severity-chip critical',
          high: 'severity-chip high',
          medium: 'severity-chip medium',
          low: 'severity-chip low'
        };

        const cssClass = classMap[sev] || 'severity-chip default';

        return `<span class="${cssClass}">${params.value}</span>`;
      }
    },
    { headerName: 'Message',     field: 'message', width: 400 },
    { headerName: 'Behavior Analysis', field: 'behavior_analysis',   sortable: true, width: 400 },
    { headerName: 'Predictive Analysis', field: 'predictive_threat',  sortable: true, width: 400 },
    { headerName: 'Access Health Score', field: 'access_health_score',   sortable: true, width: 400 },
    { headerName: 'Recommendations', field: 'recommendations',   sortable: true, width: 400 }
  ];
}
