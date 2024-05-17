import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DistrictService } from '../../../SERVICE/district.service';
import { District } from '../../../model/district';
import { CommandService } from '../../../SERVICE/command.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-district-pop',
  templateUrl: './district-pop.component.html',
  styleUrl: './district-pop.component.css'
})
export class DistrictPopComponent implements OnInit{
  ditstrictForm!:FormGroup
  commandList: any;
  crudeMode!: string;
  district!: District;

  constructor(
    private dialgRef:MatDialogRef<DistrictPopComponent>,
    private ds:DistrictService,
    private cs:CommandService,
    @Inject (MAT_DIALOG_DATA) private data:{crudeMode:string,district:District},
   
    ){

}

  ngOnInit(): void {
    this.formControll();
    console.log("passed values are =>",this.data)
    this.crudeMode=this.data.crudeMode
    this.district=this.data.district
    this.setFormValues();

    this.loadCommand();
  }
  setFormValues() {
    if(this.crudeMode=='edit' && this.district){
      this.ditstrictForm.patchValue({
        districtName:this.district.districtName,
        commandId:this.district.commandId

      })
    }
  }
  loadCommand() {
    this.cs.getAllCommand().subscribe({
      next:(resp:any)=>{
        console.table(resp)
        this.commandList=resp
      }
    
    })
  }

  formControll() {
    this.ditstrictForm=new FormGroup({
      districtName:new FormControl('',Validators.required),
      commandId:new FormControl('',Validators.required),


    })
  }

  close(){
    this.popClose();
  }
  
  popClose(){
    this.dialgRef.close("dialog has been closed");
  }
  

  save(){
    const value=this.ditstrictForm.value;
console.log(value)
  if (this.crudeMode === 'create') {
    this.ds.add(value).subscribe((response) => {
      console.log("my value are =>", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Record insrted successfully",
        showConfirmButton: false,
        timer: 1500
      });
      this.popClose()

    });
  }
  else if (this.crudeMode === 'edit' && this.district) {
    this.ds.update(this.district.districtId, value).subscribe((response) => {
      console.log("my value are =>", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Data has been updated",
        showConfirmButton: false,
        timer: 1500
      });
      this.popClose()

    });
  } 

  }

}
