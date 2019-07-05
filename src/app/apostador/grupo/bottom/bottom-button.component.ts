import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-botton-button',
  templateUrl: './bottom-button.component.html',
  styleUrls: ['./bottom-button.component.css']
})
export class BottonButtonGrupoComponent implements OnInit {

  ngOnInit(): void {
    console.log("INICIALIZAOU SUB MENU BOTTON")
  }

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottonButtonGrupoComponent>) {
  }
  openMenu(event: MouseEvent,evento:string,obj:any): void {
    console.log("EVENTO : => ", evento);
    this._bottomSheetRef.dismiss(evento);
    event.preventDefault();
  }

}
