import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { ResponseBodyInterface, Liga } from 'src/app/interfaces/response-body.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aposta-by-grupo-campeonato-brasileiro',
  templateUrl: './aposta-by-grupo-campeonato-brasileiro.component.html',
  styleUrls: ['./aposta-by-grupo-campeonato-brasileiro.component.css']
})
export class ApostaByGrupoCampeonatoBrasileiroComponent implements OnInit {

  idGrupo : any;

  liga = {} as Liga;

  rodadaAtual:number;

  constructor(private service:GrupoService, private route:ActivatedRoute) { }

  ngOnInit() {
    console.log("Aposta By Campeonato Brasileiro ");
    this.idGrupo = this.route.snapshot.params['id'];
    this.rodadaAtual = this.route.snapshot.params['rodada'];
    this.carregaRodada();
  }

  carregaRodada(){
    console.log("paginou");
    if(this.liga.rodadaAtual > this.rodadaAtual)
      this.rodadaAtual = this.liga.rodadaAtual;
    this.service.grupoByRodada(this.idGrupo,this.rodadaAtual).subscribe(
      (res:ResponseBodyInterface) =>{
        if(res.status= "SUCESSO"){
          this.liga = res.data;
        }
    })
  }

}
