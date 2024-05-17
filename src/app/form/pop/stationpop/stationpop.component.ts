import { Component, Inject, OnInit } from '@angular/core';
import { StationService } from '../../../SERVICE/station.service';
import { DistrictService } from '../../../SERVICE/district.service';
import { Station } from '../../../model/station';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { District } from '../../../model/district';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stationpop',
  templateUrl: './stationpop.component.html',
  styleUrl: './stationpop.component.css'
})
export class StationpopComponent implements OnInit {
  crudeMode!: string;
  station!: Station;
  stationForm!: FormGroup;
  districtList: District[]=[];

  constructor(
    private dialgRef:MatDialogRef<StationpopComponent>,
    private ss:StationService,
    private ds:DistrictService,
    @Inject (MAT_DIALOG_DATA) private data:{crudeMode:string,station:Station},
   
    ){

}

close(){
  this.popClose();
}

popClose(){
  this.dialgRef.close("dialog has been closed");
}

ngOnInit(): void {
  this.formControll();
  console.log("passed values are =>",this.data)
  this.crudeMode=this.data.crudeMode
  this.station=this.data.station
  this.setFormValues();

  this.loadDistrict();
}
  loadDistrict() {
    this.ds.getAllDistrict().subscribe({
      next:(resp:any)=>{
        this.districtList=resp;
        console.table(resp)
      }
    })
  }
  setFormValues() {
    if(this.crudeMode=='edit' && this.station){
      this.stationForm.patchValue({
        stationName:this.station.stationName,
        districtId:this.station.districtId

      })
    }
  }
  formControll() {
    this.stationForm=new FormGroup({
      stationName:new FormControl('',Validators.required),
      districtId:new FormControl('',Validators.required),


    })
  }

  save(){
    const value=this.stationForm.value;
console.log(value)
  if (this.crudeMode === 'create') {
    this.ss.add(value).subscribe((response) => {
      console.log("my value are =>", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Record insrted successfully",
        showConfirmButton: false,
        timer: 1500
      });
      this.popClose()

    });
  }
  else if (this.crudeMode === 'edit' && this.station) {
    this.ss.update(this.station.stationId, value).subscribe((response) => {
      console.log("my value are =>", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Data has been updated",
        showConfirmButton: false,
        timer: 1500
      });
      this.popClose()

    });
  } 

  }

}
