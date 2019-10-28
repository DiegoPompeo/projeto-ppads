import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'https://server-redesocial.herokuapp.com/redesocial/'

  constructor(private http: HttpClient) { }

  //Read
  listar() {
    return this.http.get<Pessoa[]>(this.url);
  }

  //ReadById
  verPerfil(id: number) {
    return this.http.get<Pessoa>(this.url + "/perfil/" + id);
  }

  //Update
  atualizarPerfil(pessoa: Pessoa) {
    return this.http.put<Pessoa>(this.url + "/editar/" + pessoa.id, pessoa);
  }

  //ReadByEmail
  getCientist(email: string){
    return this.http.get<Pessoa>(this.url + "/buscar/" + email);
  }
}
