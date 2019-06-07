import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BlockUIModule } from "ng-block-ui";
import { RouterModule } from "@angular/router";


import { LoginModule } from "./login/login.module";
import { NotfoundModule } from "./notfound/notfound.module";
import { PrincipalModule } from "./principal/principal.module";
import { NavBarComponent } from "./nav-bar/nav.component";
import { NavBarModule } from "./nav-bar/nav.module";
import { ApostadorModule } from "./apostador/apostador.module";
import { AdministradorModule } from "./administrador/administrador.module";
import { FormularioGrupoComponent } from "./apostador/grupo/formulario-grupo/formulario-grupo.component";
import { ApostaComponent } from "./apostador/aposta/aposta.component";
import { ApostaByGrupoComponent } from "./apostador/aposta/aposta-by-grupo/aposta-by-grupo.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ApostadorModule,
    AdministradorModule,
    LoginModule,
    NavBarModule,
    NotfoundModule,
    PrincipalModule,
    BlockUIModule.forRoot()
  ],
  exports :  [
    RouterModule
  ],
  providers: [],
  bootstrap: [NavBarComponent],
  declarations: [FormularioGrupoComponent]
})
export class AppModule { }
