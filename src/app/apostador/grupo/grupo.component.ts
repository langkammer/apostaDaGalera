import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {


  aposta : any = {};

  constructor() { }

  ngOnInit() {
  }



  abreModal = function (edit : string, object : any) {
    
    if(edit != 'new')
      this.aposta = object;
    else
      this.aposta = {};


    $("#modalGrupo").modal("show");
  };

}
