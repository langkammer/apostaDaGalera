import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-botton-user-button',
  templateUrl: './bottom-button.user.component.html',
  styleUrls: ['./bottom-button.user.component.css']
})
export class BottonButtonUserComponent implements OnInit {

  ngOnInit(): void {
    console.log("INICIALIZAOU SUB MENU BOTTON")
  }

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottonButtonUserComponent>) {
  }
  
  openMenu(event: MouseEvent,evento:string,obj:any): void {
    console.log("EVENTO : => ", evento);
    this._bottomSheetRef.dismiss(evento);
    event.preventDefault();
  }

}
