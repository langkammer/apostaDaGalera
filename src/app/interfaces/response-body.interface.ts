export interface ResponseBodyInterface{
    status:string;
    menssage:string;
    data:any;
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
    nome:string;
    logoLigatring:string;
    qtdRodadas:number;
    tipoLiga:string;
}

export interface Criterio{
    id:number;
    tipoCriterioEnum:string;
    ponto:number;
}