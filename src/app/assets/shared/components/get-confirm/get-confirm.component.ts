import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent implements OnInit {
msg!:string
  constructor(
    private dialogRef: MatDialogRef<GetConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public  message: string
  ) { 
    this.msg=message
  }
  ngOnInit(): void {
   
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }




}
