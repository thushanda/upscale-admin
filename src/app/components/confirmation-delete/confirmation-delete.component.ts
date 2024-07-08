import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirmation-delete',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './confirmation-delete.component.html',
  styleUrl: './confirmation-delete.component.scss'
})
export class ConfirmationDeleteComponent {

  constructor(private matDialog:MatDialogRef<ConfirmationDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  onConfirm():any{
    this.matDialog.close(true)
  }

  onCancel():any{
    this.matDialog.close(false)
  }

}
