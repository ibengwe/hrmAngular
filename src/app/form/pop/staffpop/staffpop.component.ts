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
    @Inject (MAT_DIALOG_DATA) private data:{crudeMode:string,staff:Staff},
   
    ){

}

  staffId!:any
  firstName!:any
  middleName!:any;
  lastName!:any;
  dateBirth!:any;
  dateEnlist!:any;
  gender!:any;
  phoneNumber!:any;
  selectedFile!: File;

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

createStaff(){
  const formData=new FormData();
  formData.append('staffId', this.staffId);
  formData.append('firstName', this.firstName);
  formData.append('middleName', this.middleName);
  formData.append('lastName', this.lastName);
  formData.append('dateBirth', this.dateBirth);
  formData.append('dateEnlist', this.dateEnlist);
  formData.append('gender', this.gender);
  formData.append('phoneNumber', this.phoneNumber);
  formData.append('image', this.selectedFile);

  this.ss.add(formData).subscribe({
    next:(resp:any)=>{
      console.log(resp)
    }
  })

  
}
onFileChanged(event:any) {
  this.selectedFile = event.target.files[0];
}


}
