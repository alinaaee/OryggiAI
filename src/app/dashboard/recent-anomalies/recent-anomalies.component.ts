import { Component, Input } from '@angular/core';
import { AgGridAngular }    from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-recent-anomalies',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './recent-anomalies.component.html',
  styleUrls: ['./recent-anomalies.component.css']
})
export class RecentAnomaliesComponent {
  @Input() rowData: any[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'Timestamp', field: 'timestamp', sortable: true },
    { headerName: 'Log Source',  field: 'source',    sortable: true },
    { headerName: 'Message',     field: 'message',   flex: 2 },
    {
      headerName: 'Severity',
      field: 'severity',
      cellRenderer: (params: ICellRendererParams) => {
        const sev = (params.value || '').toString().toLowerCase();
        const bg  = sev === 'critical' ? '#f8d7da' : '#fff3cd';
        const fg  = sev === 'critical' ? '#dc3545' : '#856404';
        return `<span style="background:${bg};color:${fg};padding:4px 8px;border-radius:5px">
                  ${params.value}
                </span>`;
      }
    }
  ];
}
