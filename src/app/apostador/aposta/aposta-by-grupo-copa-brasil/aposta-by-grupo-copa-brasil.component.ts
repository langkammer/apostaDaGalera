import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aposta-by-grupo-copa-brasil',
  templateUrl: './aposta-by-grupo-copa-brasil.component.html',
  styleUrls: ['./aposta-by-grupo-copa-brasil.component.css']
})
export class ApostaByGrupoCopaBrasilComponent implements OnInit {

  constructor() { }

  rodadaAtual = 5;


  qtdsRodadas = 8;
  
  ngOnInit() {
  }

}
