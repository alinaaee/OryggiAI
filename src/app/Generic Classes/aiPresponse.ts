export interface AnomalyResponse {
    totalLogs: number;
    totalAnomalies: number;
    anomalies: Anomaly[];
}

export interface Anomaly {
    timestamp: string;
    source: string;
    cardNo: number;
    message: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    behaviorAnalysis: string;
    predictiveThreat: string;
    accessHealthScore: number;
    recommendations: string[];
    deviceIds: number[];
    severityType: string;
}

