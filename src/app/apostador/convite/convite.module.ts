import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';


import { ConviteComponent } from './convite.component';
import { LoginModule } from 'src/app/login/login.module';

@NgModule({
    declarations: [ConviteComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        LoginModule,
        BrowserAnimationsModule,
        BlockUIModule.forRoot()
     ]
})
export class ConviteModule { }