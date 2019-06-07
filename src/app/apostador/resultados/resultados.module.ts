import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import { ResultadosComponent } from './resultados.component';
import { ResultadoDetalhadoComponent } from './resultado-detalhado/resultado-detalhado.component';
import { ResultadoDetalhadoByParticipanteComponent } from './resultado-detalhado-by-participante/resultado-detalhado-by-participante.component';


@NgModule({
    declarations: [ResultadosComponent,ResultadoDetalhadoComponent,ResultadoDetalhadoByParticipanteComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        BlockUIModule.forRoot()
     ]
})
export class ResultadosModule { }