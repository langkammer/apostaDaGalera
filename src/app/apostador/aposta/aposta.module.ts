import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';

import { ApostaComponent } from './aposta.component';
import { AppRoutingModule } from 'src/app/app-routing-module';
import { ApostaByGrupoComponent } from './aposta-by-grupo/aposta-by-grupo.component';

@NgModule({
    declarations: [ApostaComponent,ApostaByGrupoComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BlockUIModule.forRoot()
     ]
})
export class ApostaModule { }