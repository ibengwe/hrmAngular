import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StaffCourseService } from '../../SERVICE/staff-course.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StaffCourse } from '../../model/staff-course';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ocs',
  templateUrl: './ocs.component.html',
  styleUrl: './ocs.component.css'
})
export class OcsComponent implements OnInit,AfterViewInit {

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['staffId', 'firstName','middleName','lastName','gender','action' ];
  dataSource: MatTableDataSource<StaffCourse>;
  list: StaffCourse[]=[];
  modalPdf: SafeResourceUrl | null = null;

 


  constructor(
    private sc:StaffCourseService,
    private sanitizer: DomSanitizer,
    private route:Router

  ){
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit(): void {
   this.getAllPending();
  }
  getAllPending() {
    this.sc.getPending().subscribe({
      next:(resp:any)=>{
        this.list=resp
        this.dataSource = new MatTableDataSource<StaffCourse>(this.list)
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

  onAdd(){}

  onEdit(element: any) {
    this.route.navigate(['ocs-edit', element.staffId, element.courseId]);
  }

  openModel(certificate: string) {
    this.modalPdf = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${certificate}`);
    const modelDiv = document.getElementById('myModal');
    if (modelDiv) {
      modelDiv.style.display = 'block';
    }
  }
  
  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv) {
      modelDiv.style.display = 'none';
    }
    this.modalPdf = null;
  }
  
  trackById(index: number, item: any): any {
    return item.staffId;
  }
  

}
