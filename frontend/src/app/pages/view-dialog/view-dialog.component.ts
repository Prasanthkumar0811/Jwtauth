import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-dialog',
  imports: [MatDialogModule,MatIconModule],
  templateUrl: './view-dialog.component.html',
  styleUrl: './view-dialog.component.css'
})
export class ViewDialogComponent {

  user:any
  constructor(
    private dialogref:MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.user=data || {}
  }
  close(){
    this.dialogref.close()
  }
}
