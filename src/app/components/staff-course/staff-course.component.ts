import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { StaffCourseService } from '../../SERVICE/staff-course.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StaffCourse } from '../../model/staff-course';
import { StaffCoursepopComponent } from '../../form/pop/staff-coursepop/staff-coursepop.component';
import { StoreService } from '../../SERVICE/store.service';
import { AuthService } from '../../SERVICE/auth.service';
import { ImagedialogComponent } from '../../imagedialog/imagedialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-staff-course',
  templateUrl: './staff-course.component.html',
  styleUrl: './staff-course.component.css'
})
export class StaffCourseComponent{

  staffId:any
  courseId: any;
  courseList: any;
  list: any;

  modalPdf: SafeResourceUrl | null = null;

  

  constructor(
    private auth:AuthService,
    private store:StoreService,
    private sc:StaffCourseService,
    private dialog:MatDialog,
    private sanitizer: DomSanitizer

  ){}

  ngOnInit(): void {

    this.getStaffId();
    this.staffId=this.staffId
    this.getCourseByStaffId(this.staffId);
    console.log(this.modalPdf)
    
  }
  getCourseByStaffId(staffId: any) {
    this.sc.findById(staffId).subscribe({
      next:(resp:any)=>{
        this.list=resp
        console.log(resp)

      }
    })
  }
  
  
  getStaffId() {
    this.store.getStaffIdFromStore().subscribe({
      next:(resp:any)=>{
        let staffIdFromToken=this.auth.getUserIdFromeToken();
        this.staffId=resp||staffIdFromToken
        console.log(this.staffId)

      }
    })      
}





onAdd(){
  const option={

    data:{
      crudeMode:'create'
    },
    width:"600px",
    disableClose:true


  }
 const dialogRef= this.dialog.open(StaffCoursepopComponent,option)
 dialogRef.afterClosed().subscribe((result)=>{
  console.log(result);
  if(result!==undefined)
  this.loadDistrict();
})

}
loadDistrict() {
}

openModel(certificate: string) {
  this.modalPdf = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${certificate}`);
  const modelDiv = document.getElementById('myModal');
  if (modelDiv) {
    modelDiv.style.display = 'block';
  }
}

closeModel() {
  const modelDiv = document.getElementById('myModal');
  if (modelDiv) {
    modelDiv.style.display = 'none';
  }
  this.modalPdf = null;
}

trackById(index: number, item: any): any {
  return item.staffId;
}

}

