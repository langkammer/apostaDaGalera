export interface ResponseBodyInterface{
    status:string;
    menssage:string;
    data:any;
}

export interface ResponseBodyListInterface{
    status:string;
    menssage:string;
    data:any;
    totalElements:number;
    totalPages:number;
}

export interface User{
    id:number;
    nome:string;
    email:string;
    authId:string;
    permissaoAdmin:boolean;
    provider:string;
    senha:string;
}

export interface UserFirebase{
    nome : string;
    email : string;
    authId : string;
    provider : string;
}

export interface Grupo{
    id:number;
    vinculosModel:Vinculo;
    nome:string;
    ligaModel:Liga;
    descritivo:string;
    criterioPrincipal:Criterio;
    criterioSecundario:Criterio;
    times:Equipe[];
}
export interface Vinculo {
    id:number;
    nome:string;
    email:string;
    authId:string;
    provider:string;
    permissaoAdmin:boolean;
}
export interface Liga {
    id:number;
    logoLigatring:string;
    qtdRodadas:number;
    rodadaAtual:number;
    tipoLiga:string;
    formatoLiga:string;
    status:boolean;
    edicao:string;
    times:Equipe[];
    rodadas:Rodada[];
   
}

export interface Rodada {
    id:number;
    rodada:number;
    dataAbertura:string;
    horaAbertura:string;
    partidas:Partida[];
}

export interface Partida{
    id:number;
    ligaModel:Liga;
    rodada:number;
    time1:Equipe;
    time2:Equipe;
    data:string;
    horario:string;
    estadio:string;
    local:string;
    placar1:number;
    placar2:number;

}

export interface Criterio{
    id:number;
    tipoCriterioEnum:string;
    ponto:number;
    bonifica:boolean;
    pontoBonus:number;
}

export interface MatDataDialogInterface {
    action:string; 
    obj:any;
}

export interface Equipe{
    nomeAbrev: string;
    nomeCompleto: string;
    escudoPathString: string;
    sigla: string;
    url: string;
}

export interface MembroGrupo{
    id:number;
    vinculo:Vinculo;
    grupo:Grupo;
    dataEntrada:string;
}