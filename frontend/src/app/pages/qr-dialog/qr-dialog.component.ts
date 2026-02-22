import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-dialog',
  imports: [CommonModule,MatButtonModule,QRCodeComponent],
  templateUrl: './qr-dialog.component.html',
  styleUrl: './qr-dialog.component.css'
})
export class QrDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : {qrValue:string,name:string},
    private dialgref:MatDialogRef<QrDialogComponent>
  ){}

  close(){
    this.dialgref.close()
  }
}
