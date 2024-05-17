import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Courses } from '../../../model/courses';
import { DistrictService } from '../../../SERVICE/district.service';
import { CommandService } from '../../../SERVICE/command.service';

@Component({
  selector: 'app-staff-coursepop',
  templateUrl: './staff-coursepop.component.html',
  styleUrl: './staff-coursepop.component.css'
})
export class StaffCoursepopComponent implements OnInit {
  staffCourseForm!:FormGroup
  courseList: any;
  crudeMode!: string;
  commandList: any;

  constructor(
    private dialgRef:MatDialogRef<StaffCoursepopComponent>,
    private ds:DistrictService,
    private cs:CommandService,
    @Inject (MAT_DIALOG_DATA) private data:{crudeMode:string,course:Courses},
   
    ){

}

  ngOnInit(): void {
    this.formControll();
    console.log("passed values are =>",this.data)
    this.crudeMode=this.data.crudeMode
    // this.district=this.data.district
    this.setFormValues();

    this.loadCommand();
  }
  setFormValues() {
  }
  formControll() {
    this.staffCourseForm=new FormGroup({
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

  save(){}
  loadCommand() {
    this.cs.getAllCommand().subscribe({
      next:(resp:any)=>{
        console.table(resp)
        this.commandList=resp
      }
    
    })
  
  
    
    
  }
  
  }


