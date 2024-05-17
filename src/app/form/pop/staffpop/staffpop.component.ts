import { Component, Inject, OnInit } from '@angular/core';
import { StaffService } from '../../../SERVICE/staff.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Staff } from '../../../model/staff';

@Component({
  selector: 'app-staffpop',
  templateUrl: './staffpop.component.html',
  styleUrl: './staffpop.component.css'
})
export class StaffpopComponent implements OnInit {
  crudeMode!: string;

  constructor(
    private dialgRef:MatDialogRef<StaffpopComponent>,
    private ss:StaffService,
    @Inject (MAT_DIALOG_DATA) private data:{crudeMode:string,station:Staff},
   
    ){

}

ngOnInit(): void {
  this.formControll();
  console.log("passed values are =>",this.data)
  this.crudeMode=this.data.crudeMode

}
  formControll() {
  }

close(){
  this.popClose();
}

popClose(){
  this.dialgRef.close("dialog has been closed");
}


}
