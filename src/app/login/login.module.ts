import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { LoginModalComponent } from './modal/login-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyMaterialModule } from '../material-module';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';



@NgModule({
    declarations: [LoginComponent,LoginModalComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        NgbModule,
        MyMaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BlockUIModule.forRoot(),
        VMessageModule,
     ],
     entryComponents: [LoginModalComponent],
     exports : [LoginComponent,LoginModalComponent]
})
export class LoginModule { }

