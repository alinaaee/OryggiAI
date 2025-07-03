import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(private location: Location) { }

  debugConsole(val: any, data: any = ''){
    const pathArr = this.location.path().split('/');
    const pageName = pathArr[pathArr.length - 1].split('?')[0];
    if(localStorage.getItem('Debug') === pageName){ 
      data ? console.log(val, data) : console.log(val);
    }
  }
  
  formatTime(time: { hour: number; minute: number }): string {
    if (!time) return '--:--';
    const hh = time.hour < 10 ? '0' + time.hour : time.hour;
    const mm = time.minute < 10 ? '0' + time.minute : time.minute;
    return `${hh}:${mm}`;
  }

}
