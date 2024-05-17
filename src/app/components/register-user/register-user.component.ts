import { Component, inject } from '@angular/core';
import { AuthService } from '../../SERVICE/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  regForm!: FormGroup

  auth = inject(AuthService)

  ngOnInit(): void {
    this.formControl();

  }
  formControl() {
    this.regForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    })
  }

  save(){
    const value=this.regForm.value
    this.auth.register(value).subscribe({
      next:(result:any)=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Data has been updated",
          showConfirmButton: false,
          timer: 1500
        });
        console.table(result)
      }
    })
  }

}
