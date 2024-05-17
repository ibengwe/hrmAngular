import { Injectable, inject } from '@angular/core';
import { environment } from '../ENVIRONMENT/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaffCourseService {

  private  apiUrl:string=environment.apiUrl;

  http=inject(HttpClient)


  add(staffCourse:any){
    const url=`${this.apiUrl+"v1/auth/staffCourse"}`;
    return this.http.post(url,staffCourse)
  }

  // getAllCommand(){
  //   const url=`${this.apiUrl+"v1/admin/command"}`;
  //   return this.http.get(url);
  // }

  // update(commandId:number,command:Command){
  //   const url=`${this.apiUrl+"v1/admin/command"}/${commandId}`;
  //   return this.http.put(url,command);
  // }
}
