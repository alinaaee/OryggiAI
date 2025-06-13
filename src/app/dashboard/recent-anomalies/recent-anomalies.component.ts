import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-recent-anomalies',
  imports: [AgGridAngular],
  templateUrl: './recent-anomalies.component.html',
  styleUrl: './recent-anomalies.component.css'
})

export class RecentAnomaliesComponent {
columnDefs: ColDef[] = [
    { headerName: 'Timestamp', field: 'timestamp', sortable: true, filter: true },
    { headerName: 'Source', field: 'source', sortable: true, filter: true },
    { headerName: 'Message', field: 'message', flex: 2 },
    {
      headerName: 'Severity',
      field: 'severity',
      cellRenderer: (params: ICellRendererParams) => {
        const sev = params.value.toLowerCase();
        const color = sev === 'critical' ? '#f8d7da' : '#fff3cd';
        const textColor = sev === 'critical' ? '#dc3545' : '#856404';
        return `<span style="background-color: ${color}; color: ${textColor}; padding: 4px 8px; border-radius: 5px;">
                  ${params.value}
                </span>`;
      },
    },
  ];

  rowData = [
    {
      timestamp: '2025-05-03 03:06:57.000',
      source: 'Access Control',
      message:
        'Successful access by a user at times that are extremely outside any known work schedule or typical operational hours (2-4 AM for a standard office worker).',
      severity: 'Critical',
    },
    {
      timestamp: '2025-05-03 09:17:47.000',
      source: 'Access Control',
      message:
        'Direct physical interference or attempted compromise of an access control device. Event DEVICE_TAMPER_ON is logged.',
      severity: 'Critical',
    },
    {
      timestamp: '2025-05-03 11:06:42.000',
      source: 'Access Control',
      message:
        'Potential deliberate disconnection of devices from the network or critical system components failing. Event DEVICE_LINK_DISCONNECTED is logged.',
      severity: 'High',
    },
    {
      timestamp: '2025-05-03 00:03:57.000',
      source: 'Access Control',
      message:
        'Repeated attempts to gain access using invalid credentials or cards. Multiple AUTH_FAILED_TIMEOUT events for the same MachineID or CardNo.',
      severity: 'High',
    },
    {
      timestamp: '2025-05-03 09:09:18.000',
      source: 'Access Control',
      message:
        'Unusual pattern of VERIFY_FAIL_CARD events detected across multiple access points. Possible cloned card attempt.',
      severity: 'High',
    },
    {
      timestamp: '2025-05-03 09:25:18.000',
      source: 'Access Control',
      message:
        'A user\'s CardNo is associated with successful access (IDENTIFY_SUCCESS_FACE) around the same time or MachineID as a DEVICE_TAMPER_ON event.',
      severity: 'High',
    },
    {
      timestamp: '2025-05-03 00:15:42.000',
      source: 'Access Control',
      message:
        'A specific user (CardNo) repeatedly fails authentication (AUTH_FAILED_TIMEOUT or VERIFY_FAIL_CARD) at one or more machines.',
      severity: 'High',
    },
  ];
}
