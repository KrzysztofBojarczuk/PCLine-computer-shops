import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})


export class ConfirmationModalComponent {



  constructor(private dialogRef: MatDialogRef<void>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

export interface DialogData {
  titleText: string;
  confirmationText: string;
}