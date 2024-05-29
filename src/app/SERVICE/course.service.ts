import { Injectable, inject } from '@angular/core';
import { environment } from '../ENVIRONMENT/environments';
import { HttpClient } from '@angular/common/http';
import { Courses } from '../model/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private  apiUrl:string=environment.apiUrl;

  http=inject(HttpClient)


  add(course:Courses){
    const url=`${this.apiUrl+"v1/auth/course"}`;
    return this.http.post(url,course)
  }

  getAllCourses(){
    const url=`${this.apiUrl+"v1/auth/course"}`;
    return this.http.get(url);
  }

  update(courseId:number,course:Courses){
    const url=`${this.apiUrl+"v1/auth/course"}/${courseId}`;
    return this.http.put(url,course);
  }

}
