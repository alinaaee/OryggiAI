//ANGULAR IMPORTS
import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// NGPRIME
import { ButtonModule } from 'primeng/button';

// MATERIAL IMPORTS
import { MeterGroupModule } from 'primeng/metergroup';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-device-wise-severity',
  standalone: true,
  imports: [ CommonModule, MeterGroupModule, ButtonModule, MatCardModule ],
  templateUrl: './device-wise-severity.component.html',
  styleUrl: './device-wise-severity.component.css'
})
export class DeviceWiseSeverityComponent {
  @Input() anomalies: any[] = [];
  deviceMeterGroups: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anomalies'] && this.anomalies?.length) {
      this.prepareDeviceGroups();
    }
  }

  prepareDeviceGroups() {
    const deviceSet = new Set<string>();
    const deviceMap = new Map<string, { critical: number, high: number, medium: number, low: number }>();

    // Collect unique device names
    this.anomalies.forEach(anomaly => {
      (anomaly.deviceNames || []).forEach((device: string) => deviceSet.add(device));
    });

    // Initialize map with 0 counts
    deviceSet.forEach(device => {
      deviceMap.set(device, { critical: 0, high: 0, medium: 0, low: 0 });
    });

    // Count anomalies by severity per device
    this.anomalies.forEach(anomaly => {
      const severity = (anomaly.severity || '').toLowerCase();
      (anomaly.deviceNames || []).forEach((device: string) => {
        const counts = deviceMap.get(device);
        if (!counts) return;
        if (severity === 'critical') counts.critical++;
        if (severity === 'high') counts.high++;
        if (severity === 'medium') counts.medium++;
        if (severity === 'low') counts.low++;
      });
    });

    // Convert to required structure for p-metergroup
    this.deviceMeterGroups = Array.from(deviceMap.entries()).map(([deviceName, counts]) => {
      const total = counts.critical + counts.high + counts.medium + counts.low;
      const percent = (val: number) => total > 0 ? (val / total) * 100 : 0;
      return {
        deviceName, total,
        value: [
          { label: 'C: ' + counts.critical, color: '#D32F2F', value: percent(counts.critical) },
          { label: 'H: ' + counts.high, color: '#FFA000', value: percent(counts.high) },
          { label: 'M: ' + counts.medium, color: '#FBC02D', value: percent(counts.medium) },
          { label: 'L: ' + counts.low, color: '#1976D2', value: percent(counts.low) }
        ]
      };
    });
  }
}
