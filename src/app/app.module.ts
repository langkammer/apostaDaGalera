import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BlockUIModule } from "ng-block-ui";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';


import { LoginModule } from "./login/login.module";
import { NotfoundModule } from "./notfound/notfound.module";
import { PrincipalModule } from "./principal/principal.module";
import { NavBarComponent } from "./nav-bar/nav.component";
import { NavBarModule } from "./nav-bar/nav.module";
import { ApostadorModule } from "./apostador/apostador.module";
import { AdministradorModule } from "./administrador/administrador.module";
import { FormularioGrupoComponent } from "./apostador/grupo/formulario-grupo/formulario-grupo.component";
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { environment } from "src/environments/environment";
import { FirebaseModuleImports } from "./firebase/firebase.mdule";
import { MyMaterialModule } from "./material-module";
import { VMessageModule } from "./shared/components/vmessage/vmessage.module";
import { SidenavService } from "./services/sidenav.service";



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ApostadorModule,
    MyMaterialModule,
    AdministradorModule,
    LoginModule,
    NavBarModule,
    NotfoundModule,
    PrincipalModule,
    BlockUIModule.forRoot(),
    FirebaseModuleImports,
    VMessageModule,
    FlexLayoutModule
    

  ],
  exports :  [
    RouterModule,
    LoginModule,
    MyMaterialModule,
    VMessageModule,
    FirebaseModuleImports
  ],
  providers: [SidenavService],
  bootstrap: [NavBarComponent],
  declarations: [FormularioGrupoComponent]
})
export class AppModule { }
