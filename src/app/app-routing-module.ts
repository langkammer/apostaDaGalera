import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GrupoComponent } from './apostador/grupo/grupo.component';
import { ResultadosComponent } from './apostador/resultados/resultados.component';
import { ResultadoDetalhadoComponent } from './apostador/resultados/resultado-detalhado/resultado-detalhado.component';
import { ResultadoDetalhadoByParticipanteComponent } from './apostador/resultados/resultado-detalhado-by-participante/resultado-detalhado-by-participante.component';
import { RegrasComponent } from './apostador/regras/regras.component';
import { ApostaComponent } from './apostador/aposta/aposta.component';
import { ConviteComponent } from './apostador/convite/convite.component';
import { ApostaByGrupoCampeonatoBrasileiroComponent } from './apostador/aposta/aposta-by-grupo-campeonato-brasileiro/aposta-by-grupo-campeonato-brasileiro.component';
import { ApostaByGrupoCopaBrasilComponent } from './apostador/aposta/aposta-by-grupo-copa-brasil/aposta-by-grupo-copa-brasil.component';
import { CadLigasComponent } from './administrador/cad-ligas/cad-ligas.component';
import { MembrosGrupoComponent } from './apostador/grupo/membros-grupo/membros-grupo.component';
import { UserAdminComponent } from './administrador/user-admin/user-admin.component';
import { GerenciadorLigasComponent } from './administrador/gerenciador-ligas/gerenciador-ligas.component';
import { CadEquipesComponent } from './administrador/cad-equipes/cad-equipes.component';


const routes: Routes = [
    {
        path: 'login',
        component : LoginComponent
    },
    {
        path : 'apostador/grupos',
        component : GrupoComponent
    },
    {
        path : 'apostador/grupos/convite/:id',
        component : ConviteComponent
    },
    {
        path : 'apostador/regras',
        component : RegrasComponent
    },
    {
        path : 'apostador/resultados',
        component : ResultadosComponent
    },
    {
        path : 'apostador/apostas',
        component : ApostaComponent
    },
    {
        path: 'apostador/grupoByAposta/:id',
        component : MembrosGrupoComponent
    },
    {
        path : 'apostador/apostas/apostaCampeonatoBrasileiro/:id/:rodada',
        component : ApostaByGrupoCampeonatoBrasileiroComponent
    },
    {
        path : 'apostador/apostas/apostaCopaDoBrasil/:id',
        component : ApostaByGrupoCopaBrasilComponent
    },
    {
        path : 'apostador/resultados/key/detalhadoByGrupo',
        component : ResultadoDetalhadoComponent
    },
    {
        path : 'apostador/resultados/key/detalhadoByPaticipante',
        component : ResultadoDetalhadoByParticipanteComponent
    },
    {
        path : 'admin/ligas',
        component : CadLigasComponent
    },
    {
        path : 'admin/equipes',
        component : CadEquipesComponent
    },
    {
        path : 'apostador/ligas/gerenciadorLiga/:id/:tipView',
        component : GerenciadorLigasComponent
    },
    {
        path : 'admin/user',
        component : UserAdminComponent
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path: 'home',
        component : PrincipalComponent
    },
    { 
        path: '**', 
        component: NotfoundComponent 
    }  
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
