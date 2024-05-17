import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../SERVICE/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService)
  const router=inject(Router)
  const toast=inject(ToastrService)

if(auth.isLoggedIn())
  return true;
router.navigate(['/login'])
toast.error("login again !!!")
return false
};