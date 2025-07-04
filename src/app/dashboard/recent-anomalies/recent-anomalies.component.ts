//ANGULAR IMPORTS
import { Component, Input } from '@angular/core';

//MATERIAL IMPORTS
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';

//AG-GRID IMPORTS
import { AgGridAngular }    from 'ag-grid-angular';
import { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-recent-anomalies',
  standalone: true,
  imports: [AgGridAngular, MatIconModule, MatFormFieldModule, MatSelectModule, MatChipsModule],
  templateUrl: './recent-anomalies.component.html',
  styleUrls: ['./recent-anomalies.component.css']
})
export class RecentAnomaliesComponent {
  @Input() rowData: any[] = [];
  gridHeight = 100; 

  getRowClass(params: any): string {
    return 'wrap-row';
  }

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10,20,50],
  };
  
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
    { headerName: 'Behavior Analysis', field: 'behaviorAnalysis',   sortable: true, width: 400 },
    { headerName: 'Predictive Analysis', field: 'predictiveAnalysis',  sortable: true, width: 400 },
    { headerName: 'Access Health Score', field: 'accessHealthScore',   sortable: true, width: 400 },
    { headerName: 'Recommendations', field: 'recommendations',   sortable: true, width: 400 }
  ];
}
