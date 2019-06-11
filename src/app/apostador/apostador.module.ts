import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoModule } from './grupo/grupo.module';
import { ResultadosModule } from './resultados/resultados.module';
import { RegrasModule } from './regras/regras.module';
import { ApostaModule } from './aposta/aposta.module';
import { ConviteModule } from './convite/convite.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegrasModule,
    GrupoModule,
    ResultadosModule,
    ConviteModule,
    ApostaModule
  ]
})
export class ApostadorModule { }
