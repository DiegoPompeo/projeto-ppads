export class Pessoa {
    id:number;
    nome: string;
    email: string;
    senha: string;
    nroCartao: string;
    nomeNoCartao: string;
    dataValidade: string;
    codSeg: string;
    empresa: string;
    paga: boolean;
}

export class PessoaLogin{
    email: string;
    senha: string;
}