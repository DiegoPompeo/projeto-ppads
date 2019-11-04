import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa, Post } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'https://redecientista.herokuapp.com/redesocial'

  constructor(private http: HttpClient) { }

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
  getCientist(email: string) {
    return this.http.get<Pessoa>(this.url + "/buscar/" + email);
  }

  //SearchByName
  findByName(nome: string){
    return this.http.get<Pessoa[]>(this.url + "/buscarCientista/" + nome);
  }

  //AddPost
  addPost(post: Post) {
    return this.http.post<Post>(this.url + "/addPost", post);
  }

  //ReadPostByEmail
  verPost(email: string) {
    return this.http.get<Post[]>(this.url + "/verPost/" + email);
  }
}
