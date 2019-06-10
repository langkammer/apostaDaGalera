import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aposta-by-grupo-campeonato-brasileiro',
  templateUrl: './aposta-by-grupo-campeonato-brasileiro.component.html',
  styleUrls: ['./aposta-by-grupo-campeonato-brasileiro.component.css']
})
export class ApostaByGrupoCampeonatoBrasileiroComponent implements OnInit {

  rodadaAtual = 10;


  qtdsRodadas = 38;

  constructor() { }

  ngOnInit() {
  }

}
