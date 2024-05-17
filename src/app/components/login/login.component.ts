import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../SERVICE/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../SERVICE/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup

   router=inject(Router)

  constructor(
    private auth:AuthService,
    private toastr: ToastrService,
    private userStore:StoreService


  ){}
  ngOnInit(): void {
this.formData();
  }
  formData() {
    this.loginForm=new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),

    })
  }

  login(){
    const values=this.loginForm.value
      this.auth.login(values).subscribe({
        next:(resp:any)=>{
          this.toastr.success("successfully login")
          console.log("My response are =>",resp)
          this.auth.storeToken(resp.token)
          const tokenPayload = this.auth.decodeToken();
          this.userStore.setNameForStore(tokenPayload.firstName);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.userStore.setStaffIdForStore(tokenPayload.email);

          if (tokenPayload.role == 'USER') {
            this.router.navigate(['staff-profile'])

          } else if (tokenPayload.role == 'ADMIN') {
            this.router.navigate(['register'])
          }

        },
        error: (err) => {
          this.toastr.error("login failed")
          console.log('my error are ', err)
        }
      }
    )
  }
}
