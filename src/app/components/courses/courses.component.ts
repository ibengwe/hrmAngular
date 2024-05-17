import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Courses } from '../../model/courses';
import { CoursepopComponent } from '../../form/pop/coursepop/coursepop.component';
import { Dialog } from '@angular/cdk/dialog';
import { CourseService } from '../../SERVICE/course.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit,AfterViewInit {
  courseList: any;

  ngOnInit():void{
    this.loadCourses();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog
  ,private cs:CourseService) {this.dataSource = new MatTableDataSource();}


  displayedColumns: string[] = ['commandId', 'commandName','action' ];
  dataSource: MatTableDataSource<Courses>;
 
  loadCourses() {
    this.cs.getAllCourses().subscribe({
      next:(resp:any)=>{
        this.courseList=resp;
        this.dataSource = new MatTableDataSource<Courses>(this.courseList)
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

  onEdit(element:any){
    const option={

      data:{
        crudeMode:'edit',
        command:element
      },
      width:"500px",
      disableClose:true
    }
    const dialogRef= this.dialog.open(CoursepopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadCourses();
  })
  }
  onAdd(){

    const option={

      data:{
        crudeMode:'create'
      },
      width:"600px",
      disableClose:true


    }
   const dialogRef= this.dialog.open(CoursepopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadCourses();
  })

  }

}
