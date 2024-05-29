import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../../SERVICE/course.service';
import { Courses } from '../../../model/courses';

@Component({
  selector: 'app-coursepop',
  templateUrl: './coursepop.component.html',
  styleUrl: './coursepop.component.css'
})
export class CoursepopComponent implements OnInit{

  courseForm!:FormGroup

  constructor(
    private dialgRef:MatDialogRef<CoursepopComponent>,
    private cs:CourseService,
    @Inject (MAT_DIALOG_DATA) private data:{crudeMode:string,course:Courses},
   
    ){

}

  ngOnInit(): void {
    this.formControll();
    
  }
  formControll() {
    this.courseForm=new FormGroup({
      courseName:new FormControl('',Validators.required)
    })
  }

  close(){
    this.popClose();
  }
  
  popClose(){
    this.dialgRef.close("dialog has been closed");
  }

  save(){
    const values=this.courseForm.value;
    this.cs.add(values).subscribe({
      next:(resp:any)=>{
        console.table(resp)
      }
    })
  }
}
