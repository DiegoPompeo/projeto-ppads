import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa, Post, Glossario, Amizade } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'https://redecientista.herokuapp.com/redesocial'

  constructor(private http: HttpClient) { }

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
    return this.http.get<Glossario[]>(this.url + "/glossario");
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
    return this.http.put<Amizade>(this.url + "/respostaSolicitacao/" + amizade.emailMandatario, amizade);
  }
 
  //ReadByEmailMandatario
  findByEmailMandatario(email: string){
    return this.http.get<Amizade[]>(this.url + "/getAmizade/" + email)
  }
}
