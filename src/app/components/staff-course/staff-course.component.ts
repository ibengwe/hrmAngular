import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { StaffCourseService } from '../../SERVICE/staff-course.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StaffCourse } from '../../model/staff-course';
import { StaffCoursepopComponent } from '../../form/pop/staff-coursepop/staff-coursepop.component';

@Component({
  selector: 'app-staff-course',
  templateUrl: './staff-course.component.html',
  styleUrl: './staff-course.component.css'
})
export class StaffCourseComponent implements OnInit,AfterViewInit{


  sc=inject(StaffCourseService)
  dialog=inject(MatDialog)


  ngOnInit(): void {
    this.loadDistrict();
  }

  constructor() {this.dataSource = new MatTableDataSource();}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['districtId', 'districtName','commandName','action' ];
  dataSource: MatTableDataSource<StaffCourse>;
 

  // loadDistrict() {
  //   this.ds.getAllDistrict().subscribe({
  //     next:(resp:any)=>{
  //       this.districtList=resp;
  //       this.dataSource = new MatTableDataSource<District>(this.districtList)
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       console.table(resp)

  //     }
  //   })
  // }

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
      width:"600px",
      disableClose:true


    }
   const dialogRef= this.dialog.open(StaffCoursepopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadDistrict();
  })

  }
  loadDistrict() {
  }

  onEdit(element:any){
    const option={

      data:{
        crudeMode:'edit',
        district:element
      },
      width:"500px",
      disableClose:true
    }
    const dialogRef= this.dialog.open(StaffCoursepopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadDistrict();
  })
  }

}
