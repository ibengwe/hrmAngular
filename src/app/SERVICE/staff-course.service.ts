import { Injectable, inject } from '@angular/core';
import { environment } from '../ENVIRONMENT/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getById(staffId:any,courseId:any){
    const url=`${this.apiUrl+"v1/auth/staffCourse"}/${staffId}/${courseId}`
    return this.http.get(url)

  }

  findById(staffId:number){
    const url=`${this.apiUrl+"v1/auth/staffCourse/staff"}/${staffId}`;
    return this.http.get(url);

  }

  getPending(){
    return this.http.get(this.apiUrl+"v1/auth/staffCourse/status/pending")
  }

  getRpcStatus(){
    return this.http.get(this.apiUrl+"v1/auth/staffCourse/status/rpc")

  }

  updateStaffCourse(staffId: any, courseId: any, updateData: any): Observable<any> {
    const url = `${this.apiUrl}v1/auth/staffCourse/${staffId}/${courseId}`;
    return this.http.put(url, updateData);
  }

  
}
