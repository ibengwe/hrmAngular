import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommandService } from '../../../SERVICE/command.service';
import { Command } from '../../../model/command';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-command-pop',
  templateUrl: './command-pop.component.html',
  styleUrl: './command-pop.component.css'
})
export class CommandPopComponent implements OnInit{

  crudeMode!: string;
  commandForm!: FormGroup;
  command!: Command;


  constructor(
    private dialgRef:MatDialogRef<CommandPopComponent>,
    private cs:CommandService,
    @Inject (MAT_DIALOG_DATA) private data:{crudeMode:string,command:Command},
   
    ){

}

ngOnInit():void{
  this.formControl();
  console.log("passed values are =>",this.data)
  this.crudeMode=this.data.crudeMode
  this.command=this.data.command;
  this.setFormValues();

}

formControl() {
  this.commandForm=new FormGroup({
    commandName:new FormControl(null,Validators.required)
  })
}

setFormValues() {
  if (this.crudeMode === 'edit' && this.command) {
    this.commandForm.patchValue({
      commandName: this.command.commandName,
    });
  }
}

close(){
  this.popClose();
}

popClose(){
  this.dialgRef.close("dialog has been closed");
}

save(){
  const value=this.commandForm.value;
console.log(value)
  if (this.crudeMode === 'create') {
    this.cs.add(value).subscribe((response) => {
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
  else if (this.crudeMode === 'edit' && this.command) {
    this.cs.update(this.command.commandId, value).subscribe((response) => {
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
}}
