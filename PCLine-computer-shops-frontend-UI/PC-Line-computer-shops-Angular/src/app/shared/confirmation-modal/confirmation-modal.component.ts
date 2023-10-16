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
    // Tutaj można dodać kod, który ma być wykonany po potwierdzeniu
    this.dialogRef.close(true); // Zamknij modal i przekaż wartość true
  }

  onCancel(): void {
    this.dialogRef.close(false); // Zamknij modal i przekaż wartość false
  }
}

export interface DialogData {
  titleText: string;
  confirmationText: string;
}