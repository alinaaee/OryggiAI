//ANGULAR IMPORTS
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

//PRIME NG IMPORTS
import { MeterGroupModule } from 'primeng/metergroup';

//MATERIAL IMPORTS
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-type-wise-severity',
  imports: [CommonModule, MatCardModule, MeterGroupModule],
  templateUrl: './type-wise-severity.component.html',
  styleUrl: './type-wise-severity.component.css'
})
export class TypeWiseSeverityComponent {
  @Input() anomalies: any[] = [];
  typeMeterGroups: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['anomalies'] && this.anomalies?.length) {
      this.prepareTypeGroups();
    }
  }

  prepareTypeGroups() {
    const typeSet = new Set<string>();
    const typeMap = new Map<string, { critical: number, high: number, medium: number, low: number }>();
    // Step 1: Collect unique severityTypes
    this.anomalies.forEach(anomaly => {
      if (anomaly.severityType) {
        typeSet.add(anomaly.severityType);
      }
    });
    // Step 2: Initialize counters
    typeSet.forEach(type => {
      typeMap.set(type, { critical: 0, high: 0, medium: 0, low: 0 });
    });
    // Step 3: Count severities per severityType
    this.anomalies.forEach(anomaly => {
      const severity = (anomaly.severity || '').toLowerCase();
      const type = anomaly.severityType;
      if (typeMap.has(type)) {
        const counts = typeMap.get(type);
        if (!counts) return;
        if (severity === 'critical') counts.critical++;
        if (severity === 'high') counts.high++;
        if (severity === 'medium') counts.medium++;
        if (severity === 'low') counts.low++;
      }
    });
    // Step 4: Prepare final array
    this.typeMeterGroups = Array.from(typeMap.entries()).map(([severityType, counts]) => {
      const total = counts.critical + counts.high + counts.medium + counts.low;
      const percent = (val: number) => total > 0 ? (val / total) * 100 : 0;
      return {
        severityType,
        total,
        value: [
          { label: 'C : ' + counts.critical, color: '#D32F2F', value: percent(counts.critical) },
          { label: 'H : ' + counts.high, color: '#FFA000', value: percent(counts.high) },
          { label: 'M : ' + counts.medium, color: '#FBC02D', value: percent(counts.medium) },
          { label: 'L : ' + counts.low, color: '#1976D2', value: percent(counts.low) }
        ]
      };
    });
  }
}
