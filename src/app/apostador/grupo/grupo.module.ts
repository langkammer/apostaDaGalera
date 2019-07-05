import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';

import { GrupoComponent } from './grupo.component';
import { AppRoutingModule } from 'src/app/app-routing-module';
import { MembrosGrupoComponent } from './membros-grupo/membros-grupo.component';
import { MyMaterialModule } from 'src/app/material-module';
import { BottonButtonGrupoComponent } from './bottom/bottom-button.component';
import { GrupoModalComponent } from './modal/grupo-modal.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';

@NgModule({
    declarations: [GrupoComponent,BottonButtonGrupoComponent,GrupoModalComponent,MembrosGrupoComponent],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        MyMaterialModule,
        AppRoutingModule,
        BlockUIModule.forRoot(),
        VMessageModule
     ],
     entryComponents: [BottonButtonGrupoComponent,GrupoModalComponent,GrupoComponent]

})
export class GrupoModule { }