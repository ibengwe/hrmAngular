import { Component } from '@angular/core';
import { AuthService } from '../../SERVICE/auth.service';
import { StoreService } from '../../SERVICE/store.service';
import { StaffService } from '../../SERVICE/staff.service';

@Component({
  selector: 'app-staff-profiles',
  templateUrl: './staff-profiles.component.html',
  styleUrl: './staff-profiles.component.css'
})
export class StaffProfilesComponent {

  staffId:any=""
  staffList: any;

  constructor(
    private auth:AuthService,private store:StoreService,
    private ss:StaffService
  ){}


  ngOnInit(): void {
    this.getStaffId();
    this.getStaffById(this.staffId);
   
  }
  getStaffById(staffId: any) {
    this.ss.findById(staffId).subscribe({
      next:(resp:any)=>{
        this.staffList=resp
        console.table(resp)
      }
    })
  }
  getStaffId() {
    this.store.getStaffIdFromStore().subscribe({
      next:(resp:any)=>{
        let staffIdFromToken=this.auth.getUserIdFromeToken();
        this.staffId=resp||staffIdFromToken
      }
    })  }

}



