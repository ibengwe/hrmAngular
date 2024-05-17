import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { DistrictService } from '../../SERVICE/district.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Command } from '../../model/command';
import { District } from '../../model/district';
import { MatDialog } from '@angular/material/dialog';
import { DistrictPopComponent } from '../../form/pop/district-pop/district-pop.component';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrl: './district.component.css'
})
export class DistrictComponent implements OnInit {


  ds=inject(DistrictService)
  dialog=inject(MatDialog)

  districtList:District[]=[];

  ngOnInit(): void {
    this.loadDistrict();
  }

  constructor() {this.dataSource = new MatTableDataSource();}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['districtId', 'districtName','commandName','action' ];
  dataSource: MatTableDataSource<District>;
 

  loadDistrict() {
    this.ds.getAllDistrict().subscribe({
      next:(resp:any)=>{
        this.districtList=resp;
        this.dataSource = new MatTableDataSource<District>(this.districtList)
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
      width:"600px",
      disableClose:true


    }
   const dialogRef= this.dialog.open(DistrictPopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadDistrict();
  })

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
    const dialogRef= this.dialog.open(DistrictPopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadDistrict();
  })
  }

}
