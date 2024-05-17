import { Injectable, inject } from '@angular/core';
import { environment } from '../ENVIRONMENT/environments';
import { HttpClient } from '@angular/common/http';
import { Station } from '../model/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  private  apiUrl:string=environment.apiUrl;

  http=inject(HttpClient)


  add(station:Station){
    const url=`${this.apiUrl+"v1/admin/station"}`;
    return this.http.post(url,station)
  }

  getAllStation(){
    const url=`${this.apiUrl+"v1/admin/station"}`;
    return this.http.get(url);
  }

  update(stationId:number,station:Station){
    const url=`${this.apiUrl+"v1/admin/station"}/${stationId}`;
    return this.http.put(url,station);
  }
}
