import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../SERVICE/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth=inject(AuthService);

  const myToken=auth.getToken();

  if(myToken){
    req=req.clone({
      setHeaders:{Authorization:`Bearer ${myToken}`}
    })
  }
  return next(req);
};
