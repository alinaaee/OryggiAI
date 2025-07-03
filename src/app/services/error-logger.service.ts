import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorLoggerService {
    private readonly STORAGE_KEY = "error-appLogs";
    private readonly MAX_LOGS = 50;

    constructor() {}

    logError(error: any): void {
        const currentLogs = this.getLogs();
        const errorEntry = {
            message: error?.message || error.toString(),
            stack: error?.stack || null,
            time: new Date().toISOString()
        };
        
        currentLogs.push(errorEntry);

        if (currentLogs.length > this.MAX_LOGS) {
            currentLogs.splice(0, currentLogs.length - this.MAX_LOGS);
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentLogs));
    }

    getLogs(): any[] {
        const logs = localStorage.getItem(this.STORAGE_KEY);
        return logs ? JSON.parse(logs) : [];
    }

    clearLogs(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
