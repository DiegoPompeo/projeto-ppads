import { Component, OnInit } from '@angular/core';
import { Pessoa, Post, Amizade } from '../model/pessoa';
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
  amizadeAux: Amizade = new Amizade();

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
  }

  gotoDetails(cientist: Pessoa){
    localStorage.setItem("det_email", cientist.email);
    this.router.navigate(['details']);
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

        let str2 = data.inicioDaAtividade;
        const now = new Date();
        const past = new Date(str2);
        const dif = Math.abs(now.getTime() - past.getTime());
        const days = Math.ceil(dif / (1000 * 60 * 60 * 24));

        if(days < 365){
          let final2 = Math.ceil(days/12);
          this.pessoa.inicioDaAtividade = final2.toString() + "mes(es)";
        } else {
          let final2 = Math.ceil(days/365);
          this.pessoa.inicioDaAtividade = final2.toString() + "ano(s)";
        }
        
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
            this.amizadeAux = data[i];
            
            this.service.aceitaSolicitacao(this.amizadeAux).subscribe(data => {}); 
          }
        }
      }
    );
    let numero = this.solicita.indexOf(p);
    this.solicita.splice(numero);
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
            this.amizadeAux = data[i];
            
            this.service.recusaSolicitacao(this.amizadeAux).subscribe(data => {});                      
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
