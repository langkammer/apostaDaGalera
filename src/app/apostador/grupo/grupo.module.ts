import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';

import { GrupoComponent } from './grupo.component';
import { AppRoutingModule } from 'src/app/app-routing-module';
import { MembrosGrupoComponent } from './membros-grupo/membros-grupo.component';
import { MyMaterialModule } from 'src/app/material-module';

@NgModule({
    declarations: [GrupoComponent,MembrosGrupoComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        MyMaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BlockUIModule.forRoot()
     ]
})
export class GrupoModule { }