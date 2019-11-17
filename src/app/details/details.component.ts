import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Amizade, Post } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pessoa: Pessoa;
  cientista: Pessoa = new Pessoa();
  cientistas: Pessoa[];
  post: Post;
  posts: Post[];
  interesses: any;emailLogado: string;
  auth: boolean = false;
  desabilitaSolicitacao = false;
  desabilita: boolean;
  recomendou = false;
  curtidas: string;
  amizade: Amizade = new Amizade();

  constructor(private service: ServiceService, private router: Router) {
  }

  ngOnInit() {
    this.Detalhe();
    this.searchPosts();
    this.verificaSolicitacao();

    console.log("Email: ", localStorage.getItem("email"));
    console.log("Email detalhe: ", localStorage.getItem("det_email"));

    this.emailLogado = localStorage.getItem("email");
    if (!(this.emailLogado == localStorage.getItem("det_email"))) {
      this.auth = true;
    }
  }

  recomendar() {
    this.service.getCientist(localStorage.getItem("det_email")).subscribe(
      data => {
        data.curtida++;
        this.service.atualizarPerfil(data).subscribe(x => {
        })
      }
    );
    this.ngOnInit();
  }

  desrecomendar() {
    this.service.getCientist(localStorage.getItem("det_email")).subscribe(
      data => {
        data.curtida--;
        this.service.atualizarPerfil(data).subscribe(x => {
        })
      }
    );
    this.ngOnInit();
  }

  searchPosts() {
    this.service.verPost(localStorage.getItem("det_email")).subscribe(data => {
      this.posts = data.reverse();
    });
  }

  solicitarAmizade() {
    this.amizade.emailMandatario = localStorage.getItem("email");
    this.amizade.emailRemetente = localStorage.getItem("det_email");
    this.amizade.aceite = false;
    this.amizade.recusado = false;
    this.amizade.solicitado = true;
    this.desabilitaSolicitacao = this.amizade.solicitado;

    this.service.solicitaAmizade(this.amizade).subscribe(data => { this.amizade = data });
  }

  verificaSolicitacao() {
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("det_email")
            && data[i].emailMandatario == localStorage.getItem("email")
            && (data[i].solicitado == true || data[i].aceite == true || data[i].recusado == true)) {
            this.desabilitaSolicitacao = true;
          } else if (data[i].emailRemetente == localStorage.getItem("email")
          && data[i].emailMandatario == localStorage.getItem("det_email")
          && (data[i].solicitado == true || data[i].aceite == true || data[i].recusado == true)) {
            this.desabilitaSolicitacao = true;
          }
        }
      }
    )
  }

  Detalhe(){
    let email = localStorage.getItem("det_email");
    this.service.getCientist(email).subscribe(
      data => {
        let str = data.dataNascimento.toString();
        let array = str.split("-");
        let final = array[2] + "/" + array[1] + "/" + array[0];
        this.cientista.dataNascimento = final.toString();

        this.cientista.inicioDaAtividade = data.inicioDaAtividade.toString();
        
        this.pessoa = data;
        this.interesses = data.interesse.split(",");
      }
    )
  }

}
