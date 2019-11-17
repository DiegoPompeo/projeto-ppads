import { Component, OnInit } from '@angular/core';
import { Pessoa, Post } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  cientist: Pessoa = new Pessoa();
  pessoa: Pessoa = new Pessoa();
  cientistas: Pessoa[];
  post: Post;
  posts: Post[];
  atualiza = false;
  solicita: Pessoa[] = new Array<Pessoa>();
  mandatario: Pessoa = new Pessoa();  
  interesses: any;
  listaAmigos: Pessoa[] = new Array<Pessoa>();

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.searchProfile();
    this.searchPosts();
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("email")
          && data[i].solicitado == true) {
            this.service.getCientist(data[i].emailMandatario).subscribe(
              x => {
                this.mandatario = x;
                this.solicita.push(this.mandatario);
              }
            )
          }          
        }
      }
    );
    this.getAmigos();
  }

  gotoDetails(cientist: Pessoa){
    localStorage.setItem("det_email", cientist.email);
    this.router.navigate(['details']);
  }

  getAmigos(){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == true) {
            if (data[i].emailMandatario == localStorage.getItem("email")
            && (data[i].aceite == true)) {
              this.service.getCientist(data[i].emailRemetente).subscribe(
                data => {
                  this.listaAmigos.push(data);
                }
              );
            } else if(data[i].emailRemetente == localStorage.getItem("email")
            && (data[i].aceite == true)){
              this.service.getCientist(data[i].emailMandatario).subscribe(
                data => {
                  this.listaAmigos.push(data);
                }
              );
            }
          }
        }
      }
    );
  }

  searchPosts() {
    this.service.verPost(localStorage.getItem("email"))
    .subscribe(data => {
      this.posts = data.reverse();
    });
  }

  searchProfile() {
    this.service.getCientist(localStorage.getItem("email"))
      .subscribe(data => {        
        let str = data.dataNascimento.toString();
        let array = str.split("-");
        let final = array[2] + "/" + array[1] + "/" + array[0];
        this.pessoa.dataNascimento = final.toString();

        this.pessoa.inicioDaAtividade = data.inicioDaAtividade.toString();
        
        this.cientist = data;

        this.interesses = data.interesse.split(",");
      });
  }

  gotoUpdate(cientist: Pessoa) {
    localStorage.setItem("email", cientist.email.toString());
    this.router.navigate(['update'])
  }
  
  aceita(p: Pessoa){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == false 
            && data[i].recusado == false 
            && data[i].emailMandatario == p.email 
            && data[i].emailRemetente == localStorage.getItem("email")
            && data[i].solicitado == true) {
            data[i].aceite = true;
            data[i].solicitado = false;            
            
            this.service.atualizaSolicitacao(data[i]).subscribe(data => {}); 
          }
        }
      }
    );
    let numero = this.solicita.indexOf(p);
    this.solicita.splice(numero);
    this.listaSolicitacao();
  }
  
  recusa(p: Pessoa){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == false 
            && data[i].recusado == false 
            && data[i].emailMandatario == p.email 
            && data[i].emailRemetente == localStorage.getItem("email")
            && data[i].solicitado == true) {
            data[i].solicitado = false;
            data[i].recusado = true;
            
            this.service.atualizaSolicitacao(data[i]).subscribe(data => {});                      
          }
        }
      }
    ); 
    let numero = this.solicita.indexOf(p);
    this.solicita.splice(numero);
  }

  listaSolicitacao(){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("email")
          && data[i].solicitado == true) {
            this.service.getCientist(data[i].emailMandatario).subscribe(
              x => {
                this.mandatario = x;
                this.solicita.push(this.mandatario);
              }
            )
          }          
        }
      }
    );
  }
}
