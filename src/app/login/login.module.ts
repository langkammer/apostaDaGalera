import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BlockUIModule.forRoot()
     ],
     exports : [LoginComponent]
})
export class LoginModule { }

