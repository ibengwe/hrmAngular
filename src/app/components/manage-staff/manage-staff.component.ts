import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { StaffService } from '../../SERVICE/staff.service';
import { Staff } from '../../model/staff';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StaffpopComponent } from '../../form/pop/staffpop/staffpop.component';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrl: './manage-staff.component.css'
})
export class ManageStaffComponent implements OnInit{

  staffService=inject(StaffService);
  dialog=inject(MatDialog)

  route=inject(Router);
  staffList: Staff[]=[];

  constructor() {this.dataSource = new MatTableDataSource();}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['staffId', 'firstName','middleName','lastName','gender','action' ];
  dataSource: MatTableDataSource<Staff>;
 

  ngOnInit(): void {
    this.loadStaff()
  }
  loadStaff() {
  this.staffService.getAllStaff().subscribe({
    next:(resp:any)=>{
      this.staffList=resp
      this.dataSource = new MatTableDataSource<Staff>(this.staffList)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      console.table(resp)
    }
  })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAdd(){

    const option={

      data:{
        crudeMode:'create'
      },
      width:"800px",
      disableClose:true


    }
   const dialogRef= this.dialog.open(StaffpopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadStaff();
  })

}
  onEdit(element:any){
    this.route.navigate(["user-profile/"+element.staffId])

  }

}
