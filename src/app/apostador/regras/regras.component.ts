import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regras',
  templateUrl: './regras.component.html',
  styleUrls: ['./regras.component.css']
})
export class RegrasComponent implements OnInit {

  aposta : any = {};

  criterio : any = {};

  constructor() { }

  ngOnInit() {
  }



  showCriteriaCollapse = function(){
      console.log("collapse")
      $('#colapseCiteria').collapse('toggle')
  }



  abreModal = function (edit : string, object : any) {
    
    console.log("a")
    if(edit != 'new')
      this.aposta = object;
    else
      this.aposta = {};


    $("#modalRegra").modal("show");
  };


}
