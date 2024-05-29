import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Courses } from '../../../model/courses';
import { DistrictService } from '../../../SERVICE/district.service';
import { CommandService } from '../../../SERVICE/command.service';
import { CourseService } from '../../../SERVICE/course.service';
import { AuthService } from '../../../SERVICE/auth.service';
import { StoreService } from '../../../SERVICE/store.service';
import { StaffCourseService } from '../../../SERVICE/staff-course.service';

@Component({
  selector: 'app-staff-coursepop',
  templateUrl: './staff-coursepop.component.html',
  styleUrl: './staff-coursepop.component.css'
})
export class StaffCoursepopComponent implements OnInit {
  staffCourseForm!:FormGroup
  courseList: any;
  crudeMode!: string;
  staffId!:any
  courseId:any

  selectedFile!: File;


  constructor(
    private dialgRef:MatDialogRef<StaffCoursepopComponent>,
    private cs:CourseService,
    private sc:StaffCourseService,
    private auth:AuthService,private store:StoreService,

    @Inject (MAT_DIALOG_DATA) private data:{crudeMode:string,course:Courses},
   
    ){

}

  ngOnInit(): void {
    console.log("passed values are =>",this.data)
    this.crudeMode=this.data.crudeMode
    this.setFormValues();
    this.loadCourse();

    this.store.getStaffIdFromStore().subscribe({
      next:(resp:any)=>{
        const staffIdFromToken=this.auth.getUserIdFromeToken();
        this.staffId=resp||staffIdFromToken

      }
    })


  }
  loadCourse() {
    this.cs.getAllCourses().subscribe({
      next:(resp:any)=>{
        console.table(resp)
        this.courseList=resp

      }
    })

  }
  setFormValues() {
  }
  

  close(){
    this.popClose();
  }
  
  popClose(){
    this.dialgRef.close("dialog has been closed");
  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }
  

  save(){
    // const value=this.staffCourseForm.value;
    // console.table(value)
    const formData=new FormData();
    formData.append('staffId', this.staffId);
    formData.append('courseId', this.courseId);
    formData.append('certificate', this.selectedFile);

    this.sc.add(formData).subscribe({
      next:(resp:any)=>{
        console.table(formData)

      }
    })


  }
  
  
    
    
  
  
  }


