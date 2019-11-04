export class Pessoa {
    id:number;
    nome: string;
    email: string;
    senha: string;
    empresa: string;
    inicioDaAtividade: string;
    dataNascimento: string;
    nivelEscolaridade: string;
    cidade: string;
    estado: string;
    salario: string;

    nroCartao: string;
    nomeNoCartao: string;
    dataValidade: string;
    codSeg: string;    

    paga: boolean;
    curtidas: number;
    interesse: string;
}

export class PessoaNome{
    nome: string;
}

export class PessoaLogin{
    email: string;
    senha: string;
}

export class Post{
    id: number;
    conteudo: string;
    email: string;
    curtidas: number;
}

export class Glossario{
    id: number;
    nome: string;
}
