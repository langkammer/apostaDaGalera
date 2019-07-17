import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from 'src/app/app-routing-module';
import { MyMaterialModule } from 'src/app/material-module';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { GerenciadorLigasComponent } from './gerenciador-ligas.component';

@NgModule({
    declarations: [GerenciadorLigasComponent],
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
     ]

})
export class GerenciadorLigasModule { }