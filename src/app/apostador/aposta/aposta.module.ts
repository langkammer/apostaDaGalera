import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ApostaComponent } from './aposta.component';
import { AppRoutingModule } from 'src/app/app-routing-module';
import { ApostaByGrupoComponent } from './aposta-by-grupo/aposta-by-grupo.component';
import { ApostaByGrupoCampeonatoBrasileiroComponent } from './aposta-by-grupo-campeonato-brasileiro/aposta-by-grupo-campeonato-brasileiro.component';
import { ApostaByGrupoCopaBrasilComponent } from './aposta-by-grupo-copa-brasil/aposta-by-grupo-copa-brasil.component';

@NgModule({
    declarations: [ApostaComponent,ApostaByGrupoComponent,ApostaByGrupoCampeonatoBrasileiroComponent,ApostaByGrupoCopaBrasilComponent],
    imports: [ 
        NgbModule,

        CommonModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BlockUIModule.forRoot()
     ]
})
export class ApostaModule { }