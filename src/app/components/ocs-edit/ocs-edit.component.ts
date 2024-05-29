import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffCourseService } from '../../SERVICE/staff-course.service';

@Component({
  selector: 'app-ocs-edit',
  templateUrl: './ocs-edit.component.html',
  styleUrl: './ocs-edit.component.css'
})
export class OcsEditComponent {
  staffId!:any;
  courseId!:any;
  courseName!:any
  commentByOcs!:any;
  commentByOcd!:any
  commentByRpc!:any
  commentByCommissioner!:any
  status!:any;
  selectedFile!: File;

  certificate!:any

  constructor(
    private activeRoute:ActivatedRoute,
    private sc:StaffCourseService
  ){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.staffId = params.get('staffId');
      this.courseId = params.get('courseId');

      console.log('staffId=',this.staffId)
      console.log('courseid=',this.courseId)
      this.getById(this.staffId,this.courseId)

    });
  }
  getById(staffId: any, courseId: any) {
    this.sc.getById(staffId,courseId).subscribe({
      next:(resp:any)=>{
        console.log(resp)
        this.staffId = resp.staffId;
        this.courseId = resp.courseId;
        this.courseName = resp.courseName;
        this.selectedFile=resp.certificate;

        this.certificate = resp.certificate;
        this.commentByOcs = resp.commentByOcs;
        this.commentByOcd = resp.commentByOcd;
        this.commentByRpc = resp.commentByRpc;
        this.commentByCommissioner = resp.commentByCommissioner;
        this.status = resp.status;

      }
    })
  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }

  

 

 

  save(){

    // const updateData = {
    //     staffId : this.staffId,
    //     courseId : this.courseId,
    //     certificate : this.selectedFile,
    //     commentByOcs : this.commentByOcs,
    //     commentByOcd : this.commentByOcd,
    //     commentByRpc :this.commentByRpc,
    //     commentByCommissioner : this.commentByCommissioner,
    //     status: this.status
    // };

    const formData=new FormData();
  formData.append('staffId', this.staffId);
  formData.append('courseId', this.courseId);
  formData.append('certificate', this.certificate);
  formData.append('commentByOcs', this.commentByOcs);
  formData.append('commentByOcd', this.commentByOcd);
  formData.append('commentByRpc', this.commentByRpc);
  formData.append('commentByCommissioner', this.commentByCommissioner);
  formData.append('certificate', this.selectedFile);
  formData.append('status', this.status);



    console.table(formData)

    this.sc.updateStaffCourse(this.staffId, this.courseId, formData).subscribe({
      next: (resp: any) => {
        console.log('Update successful', resp);
        // Handle success response
      },
      error: (err: any) => {
        console.error('Update failed', err);
        // Handle error response
      }
    });
  }

    


  // const formData=new FormData();
  // formData.append('staffId', this.staffId);
  // formData.append('firstName', this.firstName);
  // formData.append('middleName', this.middleName);
  // formData.append('lastName', this.lastName);
  // formData.append('dateBirth', this.dateBirth);
  // formData.append('dateEnlist', this.dateEnlist);
  // formData.append('gender', this.gender);
  // formData.append('phoneNumber', this.phoneNumber);
  // formData.append('image', this.selectedFile);

  // this.ss.add(formData).subscribe({
  //   next:(resp:any)=>{
  //     console.log(resp)
  //   }
  // })

  
  
}
