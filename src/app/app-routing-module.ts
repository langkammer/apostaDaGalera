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
import { ApostaByGrupoComponent } from './apostador/aposta/aposta-by-grupo/aposta-by-grupo.component';
import { ConviteComponent } from './apostador/convite/convite.component';


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
        path : 'apostador/grupo/key/convite',
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
        path : 'apostador/apostas/key/apostarByGrupo',
        component : ApostaByGrupoComponent
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
