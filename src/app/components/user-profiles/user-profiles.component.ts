import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../../SERVICE/staff.service';
import { Staff } from '../../model/staff';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrl: './user-profiles.component.css'
})
export class UserProfilesComponent {

  activeRoute=inject(ActivatedRoute)
  ss=inject(StaffService)
  staffList: any;


  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next:(resp:any)=>{
        const staffId=resp.id
        this.getStaffById(staffId);
        console.table(resp)
      }
    })
  }
  getStaffById(staffId: any) {
    this.ss.findById(staffId).subscribe({
      next:(resp:any)=>{
        this.staffList=resp
        console.table(resp)
      }
    })
  }
  

}
