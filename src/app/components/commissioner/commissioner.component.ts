import { Component } from '@angular/core';
import { StaffCourseService } from '../../SERVICE/staff-course.service';

@Component({
  selector: 'app-commissioner',
  templateUrl: './commissioner.component.html',
  styleUrl: './commissioner.component.css'
})
export class CommissionerComponent {

  constructor(
    private sc:StaffCourseService
  ){}

  ngOnInit(): void {
    this.getStatusRpc();
  }
  getStatusRpc() {
    this.sc.getRpcStatus().subscribe({
      next:(resp:any)=>{

        console.table(resp)

      }
    })
  }

}
