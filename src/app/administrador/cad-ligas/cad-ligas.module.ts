import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';

import { CadLigasComponent } from './cad-ligas.component';
import { AppRoutingModule } from 'src/app/app-routing-module';

@NgModule({
    declarations: [CadLigasComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BlockUIModule.forRoot()
     ]
})
export class CadLigasModule { }