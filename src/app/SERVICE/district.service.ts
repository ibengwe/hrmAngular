import { Injectable, inject } from '@angular/core';
import { environment } from '../ENVIRONMENT/environments';
import { HttpClient } from '@angular/common/http';
import { District } from '../model/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private  apiUrl:string=environment.apiUrl;

  http=inject(HttpClient)


  add(district:District){
    const url=`${this.apiUrl+"v1/admin/district"}`;
    return this.http.post(url,district)
  }

  getAllDistrict(){
    const url=`${this.apiUrl+"v1/admin/district"}`;
    return this.http.get(url);
  }

  update(districtId:number,district:District){
    const url=`${this.apiUrl+"v1/admin/district"}/${districtId}`;
    return this.http.put(url,district);
  }
}
