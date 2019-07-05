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
    nome:string;
    ligaModel:Liga;
    descritivo:string;
    criterioPrincipal:Criterio;
    bonusPorTodosAcertosPrincipal:boolean;
    criterioSecundario:Criterio;
    criterioSecundarioAcumulaPrincipal:boolean;
    bonusPorTodosAcertosSecundario:boolean;
}

export interface Liga {
    id:number;
    logoLigatring:string;
    qtdRodadas:number;
    tipoLiga:string;
    formatoLiga:string;
    status:boolean;
    edicao:string;
    equipes:Equipe[];
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