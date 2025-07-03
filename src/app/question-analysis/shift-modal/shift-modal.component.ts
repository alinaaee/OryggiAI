//ANGULAR COMPONENTS
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

// BOOTSTRAP COMPONENTS
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

// MATERIAL COMPONENTS
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-shift-modal',
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule, MatIconModule, MatDialogModule, MatButtonModule, MatTableModule, NgbTimepickerModule],
  templateUrl: './shift-modal.component.html',
  styleUrl: './shift-modal.component.css'
})

export class ShiftModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ShiftModalComponent>, public utilService: UtilityService) {
    this.shifts = Array.isArray(data) ? [...data] : [];
  }

  time = { hour: 13, minute: 30 };
  shiftName = '';
  startTime = '';
  endTime = '';
  shifts: { name: string; start: string; end: string }[] = [];
  displayedColumns: string[] = ['name', 'start', 'end', 'actions'];

  addShift() {
    this.shifts.push({ name: this.shiftName, start: this.startTime, end: this.endTime });
    this.shifts = [...this.shifts]; 
    this.shiftName = '';
    this.startTime = '';
    this.endTime = '';
  }

  removeShift(index: number) {
    this.shifts.splice(index, 1);
    this.shifts = [...this.shifts];
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.shifts);
  }
}
