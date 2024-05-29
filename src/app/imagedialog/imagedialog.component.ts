import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-imagedialog',
  templateUrl: './imagedialog.component.html',
  styleUrl: './imagedialog.component.css'
})
export class ImagedialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageSrc: string }) {}


}
