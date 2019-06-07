import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadLigasModule } from './cad-ligas/cad-ligas.module';
import { UserAdminModule } from './user-admin/user-admin.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CadLigasModule,
    UserAdminModule
  ]
})
export class AdministradorModule { }
