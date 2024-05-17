import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StoreService } from '../../SERVICE/store.service';
import { AuthService } from '../../SERVICE/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-layout',
  templateUrl: './my-layout.component.html',
  styleUrl: './my-layout.component.css'
})
export class MyLayoutComponent {

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    public role!: string;
     public firstName:string="";
     staffId:any=""


  constructor(
    private auth:AuthService,private store:StoreService,
  ){}

    ngOnInit() :void{
      this.store.getNameFromStore()
      .subscribe(res=>{
        let nameFromToken=this.auth.getNameFromeToken();
        this.firstName=res || nameFromToken;
        
      });

      this.store.getRoleFromStore()
      .subscribe(resp=>{
        let roleFromToken=this.auth.getRoleFromToken();
        this.role=resp||roleFromToken
      }); 

      this.store.getStaffIdFromStore().subscribe({
        next:(resp:any)=>{
          let staffIdFromToken=this.auth.getUserIdFromeToken();
          this.staffId=resp||staffIdFromToken

        }
      })

      
      
    }

    onLogOut() {
      this.auth.logout();
}}


