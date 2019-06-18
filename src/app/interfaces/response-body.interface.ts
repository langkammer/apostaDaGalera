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
