import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommandService } from '../../SERVICE/command.service';
import { Router } from '@angular/router';
import { Command } from '../../model/command';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CommandPopComponent } from '../../form/pop/command-pop/command-pop.component';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrl: './command.component.css'
})
export class CommandComponent implements OnInit,AfterViewInit {

  cs=inject(CommandService);
  router=inject(Router)
  commaandList: Command[]=[];
  dialog=inject(MatDialog)

  constructor() {this.dataSource = new MatTableDataSource();}

  ngOnInit():void{
    this.loadCommand();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['commandId', 'commandName','action' ];
  dataSource: MatTableDataSource<Command>;
 
  loadCommand() {
    this.cs.getAllCommand().subscribe({
      next:(command:any)=>{
        this.commaandList=command;
        this.dataSource = new MatTableDataSource<Command>(this.commaandList)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.table(command)

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
    const dialogRef= this.dialog.open(CommandPopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadCommand();
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
   const dialogRef= this.dialog.open(CommandPopComponent,option)
   dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    if(result!==undefined)
    this.loadCommand();
  })

  }

}

