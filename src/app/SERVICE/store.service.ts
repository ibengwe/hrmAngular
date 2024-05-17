import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private firstName$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");
  private staffId$=new BehaviorSubject<string>("");


  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getNameFromStore(){
    return this.firstName$.asObservable();
  }

  public setNameForStore(firstName:string){
    this.firstName$.next(firstName);
  }

  public getStaffIdFromStore(){
    return this.staffId$.asObservable();
  }

  public setStaffIdForStore(staffId:string){
    this.staffId$.next(staffId);
  }}
