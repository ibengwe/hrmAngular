import { Injectable, inject } from '@angular/core';
import { environment } from '../ENVIRONMENT/environments';
import { HttpClient } from '@angular/common/http';
import { Command } from '../model/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private  apiUrl:string=environment.apiUrl;

  http=inject(HttpClient)


  add(command:Command){
    const url=`${this.apiUrl+"v1/admin/command"}`;
    return this.http.post(url,command)
  }

  getAllCommand(){
    const url=`${this.apiUrl+"v1/admin/command"}`;
    return this.http.get(url);
  }

  update(commandId:number,command:Command){
    const url=`${this.apiUrl+"v1/admin/command"}/${commandId}`;
    return this.http.put(url,command);
  }


}
