
export interface LoginBody {
    username:string;
    password:string;
}
export interface AddspesaRequest{
    importo:number,
    data:Date,
    descrizione:string,
    categoria:string,
}

export interface RegisterUserDTO {
    username: string,
    email: string,
    password: string,
    nome: string,
    cognome: string,
  
}