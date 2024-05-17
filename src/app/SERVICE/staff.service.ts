import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../ENVIRONMENT/environments';
import { Staff } from '../model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private  apiUrl:string=environment.apiUrl;

  http=inject(HttpClient)


  add(staff:Staff){
    const url=`${this.apiUrl+"v1/auth/staff"}`;
    return this.http.post(url,staff)
  }

  getAllStaff(){
    const url=`${this.apiUrl+"v1/auth/staff"}`;
    return this.http.get(url);
  }

  findById(staffId:number){
    const url=`${this.apiUrl+"v1/auth/staff"}/${staffId}`;
    return this.http.get(url);

  }

  update(staffId:number,staff:Staff){
    const url=`${this.apiUrl+"v1/admin/auth"}/${staffId}`;
    return this.http.put(url,staff);
  }
}
