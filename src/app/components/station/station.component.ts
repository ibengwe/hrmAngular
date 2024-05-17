import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { StationService } from '../../SERVICE/station.service';
import { Station } from '../../model/station';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { StationpopComponent } from '../../form/pop/stationpop/stationpop.component';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrl: './station.component.css'
})
export class StationComponent implements OnInit {

  ss=inject(StationService)
  dialog=inject(MatDialog)

  stationList: Station[]=[];

  constructor() {this.dataSource = new MatTableDataSource();}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['stationId', 'stationName','districtName','action' ];
  dataSource: MatTableDataSource<Station>;
 


  ngOnInit(): void {
    this.loadStation();
  }
  loadStation() {
    this.ss.getAllStation().subscribe({
      next:(resp:any)=>{
        this.stationList=resp;
        this.dataSource = new MatTableDataSource<Station>(this.stationList)
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
   const dialogRef= this.dialog.open(StationpopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadStation();
  })

  }

  onEdit(element:Station){
    const option={

      data:{
        crudeMode:'edit',
        station:element
      },
      width:"500px",
      disableClose:true
    }
    const dialogRef= this.dialog.open(StationpopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
      this.loadStation();
  })
  }


}
