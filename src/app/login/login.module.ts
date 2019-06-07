import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from '../app-routing-module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BlockUIModule.forRoot()
     ]
})
export class LoginModule { }