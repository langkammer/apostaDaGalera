import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import { ChecklistModule } from 'angular-checklist';

import { GrupoComponent } from './grupo.component';
import { AppRoutingModule } from 'src/app/app-routing-module';
import { MembrosGrupoComponent } from './membros-grupo/membros-grupo.component';
import { MyMaterialModule } from 'src/app/material-module';
import { BottonButtonGrupoComponent } from './bottom/bottom-button.component';
import { GrupoModalComponent } from './modal/grupo-modal.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { BottonButtonGrupoByMembroComponent } from './membros-grupo/bottom/bottom-button.component';

@NgModule({
    declarations: [GrupoComponent,BottonButtonGrupoComponent,BottonButtonGrupoByMembroComponent,GrupoModalComponent,MembrosGrupoComponent],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        MyMaterialModule,
        AppRoutingModule,
        BlockUIModule.forRoot(),
        ChecklistModule,
        VMessageModule
        
     ],
     entryComponents: [BottonButtonGrupoComponent,BottonButtonGrupoByMembroComponent,GrupoModalComponent,GrupoComponent]

})
export class GrupoModule { }