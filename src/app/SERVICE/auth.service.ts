import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../ENVIRONMENT/environments';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  apiUrl:string=environment.apiUrl;
    private payLoad:any
    route=inject(Router)


  constructor(private http:HttpClient) { 
        this.payLoad=this.decodeToken();

  }

  login(logObj:any){
    const url=`${this.apiUrl+'v1/auth/authenticate'}`;
    return this.http.post(url,logObj);

  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  register(reg:any){
    const url=`${this.apiUrl+'v1/auth/register'}`;
    return this.http.post(url,reg);

  }

   decodeToken(){
    const jwthelper=new JwtHelperService();
    const token=this.getToken()!;
    console.log(jwthelper.decodeToken(token))
    return jwthelper.decodeToken(token);
  }

  
  getNameFromeToken(){
    if(this.payLoad)
      return this.payLoad.firstName;
  }

  getUserIdFromeToken(){
    if(this.payLoad)
      return this.payLoad.email;
  }

  getRoleFromToken(){
    if(this.payLoad)
      return this.payLoad.role;
  }

  logout(){
    const token = this.getToken();
      const logoutUrl = 'http://localhost:8080/api/v1/auth/logout'; // Replace with your actual logout endpoint URL
    
      // Make a POST request to the logout endpoint with the token in the headers
      this.http.post(logoutUrl, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).subscribe(
        () => {
          // Logout successful, clear local storage and navigate to login page
          localStorage.clear();
          this.route.navigate(['/login']);
        },
        (error) => {
          console.error('Error revoking token:', error);
          // Handle error, clear local storage, and navigate to login page
          localStorage.clear();
          this.route.navigate(['/login']);
        }
      );
    }
}
