import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';

import { UserAdminComponent } from './user-admin.component';
import { AppRoutingModule } from 'src/app/app-routing-module';
import { MyMaterialModule } from 'src/app/material-module';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { BottonButtonUserComponent } from './bottom/bottom-button.user.component';
import { UserModalComponent } from './modal/user-modal.component';

@NgModule({
    declarations: [UserAdminComponent,BottonButtonUserComponent,UserModalComponent],
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
     entryComponents: [BottonButtonUserComponent,UserModalComponent]

})
export class UserAdminModule { }