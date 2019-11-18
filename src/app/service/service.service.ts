import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa, Post, Glossario, Amizade, PessoaRecomendada } from '../model/pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'https://redecientista.herokuapp.com/redesocial'

  constructor(private http: HttpClient) { }


  //AddRecomendacao
  addRecomendacao(pessoaRecomendada: PessoaRecomendada): Observable<PessoaRecomendada>{
    return this.http.post<PessoaRecomendada>(this.url + "/addRecomendacao", pessoaRecomendada);
  }

  //EditRecomendacao
  editRecomendacao(pessoaRecomendada: PessoaRecomendada): Observable<PessoaRecomendada>{
    return this.http.put<PessoaRecomendada>(this.url + "/editRecomendacao/" + 
    pessoaRecomendada.emailRecomendou + "/" + pessoaRecomendada.emailRecomendada, 
    pessoaRecomendada);
  }

  //ListRecomendacao
  listaRecomendacao(){
    return this.http.get<PessoaRecomendada[]>(this.url + "/getRecomendacao");
  }

  //FindByName
  findByName(nome: string){
    return this.http.get<Pessoa[]>(this.url + "/buscarCientista/" + nome);
  }

   //Read
   listar() {
    return this.http.get<Pessoa[]>(this.url);
  }

  //ReadById
  verPerfil(id: number) {
    return this.http.get<Pessoa>(this.url + "/" + id);
  }

  //Update
  atualizarPerfil(pessoa: Pessoa) {
    return this.http.put<Pessoa>(this.url + "/editar/" + pessoa.email, pessoa);
  }

  //ReadByEmail
  getCientist(email: string){
    return this.http.get<Pessoa>(this.url + "/buscar/" + email);
  }

  //AddPost
  addPost(post: Post){
    return this.http.post<Post>(this.url + "/addPost", post);
  }

  //ReadPostByEmail
  verPost(email: string){
    return this.http.get<Post[]>(this.url+ "/verPost/" + email);
  }

  //AddGlossary
  addGlossary(glossario: Glossario){
    return this.http.post<Glossario>(this.url + "/addGlossario", glossario);
  }

  //ListGlossary
  listaGlossary(){
    return this.http.get<Glossario[]>("https://server-redesocial.herokuapp.com/redesocial/glossario");
  }

   
  //SolicitaAmizade
  solicitaAmizade(amizade: Amizade) {
    return this.http.post<Amizade>(this.url + "/amizade", amizade);
  }
 
  //ListarAmizade
  listaAmizade(){
    return this.http.get<Amizade[]>(this.url + "/listaAmizade")
  }
 
  //AtualizaSolicitacao
  atualizaSolicitacao(amizade: Amizade){
    return this.http.put<Amizade>(this.url + "/respostaSolicitacao/" 
    + amizade.emailMandatario + "/" + amizade.emailRemetente
    , amizade);
  }
 
  //ReadByEmailMandatario
  findByEmailMandatario(email: string){
    return this.http.get<Amizade[]>(this.url + "/getAmizade/" + email)
  }
}
