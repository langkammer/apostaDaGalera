import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';

import { CadLigasComponent } from './cad-ligas.component';
import { AppRoutingModule } from 'src/app/app-routing-module';
import { MyMaterialModule } from 'src/app/material-module';
import { BottonButtonComponent } from './bottom/bottom-button.component';
import { LigaModalComponent } from './modal/liga-modal.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';

@NgModule({
    declarations: [CadLigasComponent,BottonButtonComponent,LigaModalComponent],
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
    exports: [LigaModalComponent], 
    entryComponents: [BottonButtonComponent,LigaModalComponent]

})
export class CadLigasModule { }