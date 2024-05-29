import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyLayoutComponent } from './layout/my-layout/my-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './components/login/login.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import { tokenInterceptor } from './HTTP_INTERCEPTORS/token.interceptor';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {MatCardModule} from '@angular/material/card';
import { UserlistComponent } from './components/userlist/userlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandComponent } from './components/command/command.component';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommandPopComponent } from './form/pop/command-pop/command-pop.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DistrictComponent } from './components/district/district.component';
import { StationComponent } from './components/station/station.component';
import { DistrictPopComponent } from './form/pop/district-pop/district-pop.component';
import { StationpopComponent } from './form/pop/stationpop/stationpop.component';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';
import { ManageStaffComponent } from './components/manage-staff/manage-staff.component';
import { StaffpopComponent } from './form/pop/staffpop/staffpop.component';
import { StaffProfilesComponent } from './components/staff-profiles/staff-profiles.component';
import { StaffCourseComponent } from './components/staff-course/staff-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursepopComponent } from './form/pop/coursepop/coursepop.component';
import { StaffCoursepopComponent } from './form/pop/staff-coursepop/staff-coursepop.component';
import { ImagedialogComponent } from './imagedialog/imagedialog.component';
import { OcsComponent } from './components/ocs/ocs.component';
import { OcdComponent } from './components/ocd/ocd.component';
import { RpcComponent } from './components/rpc/rpc.component';
import { CommissionerComponent } from './components/commissioner/commissioner.component';
import { OcsEditComponent } from './components/ocs-edit/ocs-edit.component';








@NgModule({
  declarations: [
    AppComponent,
    MyLayoutComponent,
    LoginComponent,
    RegisterUserComponent,
    UserlistComponent,
    CommandComponent,
    CommandPopComponent,
    DistrictComponent,
    StationComponent,
    DistrictPopComponent,
    StationpopComponent,
    UserProfilesComponent,
    ManageStaffComponent,
    StaffpopComponent,
    StaffProfilesComponent,
    StaffCourseComponent,
    CoursesComponent,
    CoursepopComponent,
    StaffCoursepopComponent,
    ImagedialogComponent,
    OcsComponent,
    OcdComponent,
    RpcComponent,
    CommissionerComponent,
    OcsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    ToastrModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule, 
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    ToastrModule.forRoot(),


  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
