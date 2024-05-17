import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyLayoutComponent } from './layout/my-layout/my-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { authGuard } from './GUARD/auth.guard';
import { CommandComponent } from './components/command/command.component';
import { DistrictComponent } from './components/district/district.component';
import { StationComponent } from './components/station/station.component';
import { ManageStaffComponent } from './components/manage-staff/manage-staff.component';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { StaffProfilesComponent } from './components/staff-profiles/staff-profiles.component';
import { StaffCourseComponent } from './components/staff-course/staff-course.component';
import { CoursesComponent } from './components/courses/courses.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:MyLayoutComponent,
  canActivate:[authGuard],
  
  children:[
    {path:"register",component:RegisterUserComponent},
    {path:"userlist",component:UserlistComponent},
    {path:"command",component:CommandComponent},
    {path:"district",component:DistrictComponent},
    {path:"station",component:StationComponent},
    {path:"courses",component:CoursesComponent},
    {path:"staff",component:ManageStaffComponent},
    {path:"user-profile/:id",component:UserProfilesComponent},
    {path:"staff-profile",component:StaffProfilesComponent},
    {path:"staff-course",component:StaffCourseComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
