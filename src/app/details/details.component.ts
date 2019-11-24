import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Amizade, Post, PessoaRecomendada } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

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
  interesses: any; emailLogado: string;
  auth: boolean = false;
  desabilitaSolicitacao = false;
  desabilita: boolean;
  recomendou = false;
  curtidas: string;
  curtir: number;
  amizade: Amizade = new Amizade();
  pessoaRecomendada: PessoaRecomendada = new PessoaRecomendada();
  listaRecomendadas: PessoaRecomendada[];

  listaAmigos: Pessoa[] = new Array<Pessoa>();
  listaAmigosDetails: Pessoa[] = new Array<Pessoa>();
  amigosEmComum = [];
  emailsAmigos = [];
  emailsAmigosDet = [];

  constructor(private service: ServiceService, private router: Router) {    
  }

  ngOnInit() {
    this.Detalhe();
    this.searchPosts();
    this.verificaSolicitacao();
    this.verificaRecomendar();
    this.intersecao();

    this.emailLogado = localStorage.getItem("email");
    if (!(this.emailLogado == localStorage.getItem("det_email"))) {
      this.auth = true;
    }
  }

  intersecao(){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite === true) {
            if (data[i].emailMandatario == localStorage.getItem("det_email")) {
              this.service.getCientist(data[i].emailRemetente).subscribe(
                data => {
                  this.listaAmigosDetails.push(data);
                  this.emailsAmigosDet.push(data.email);
                }
              );
            } else if (data[i].emailRemetente == localStorage.getItem("det_email")) {
              this.service.getCientist(data[i].emailMandatario).subscribe(
                data => {
                  this.listaAmigosDetails.push(data);
                  this.emailsAmigosDet.push(data.email);
                }
              );
            } else if (data[i].emailMandatario == localStorage.getItem("email")) {
              this.service.getCientist(data[i].emailRemetente).subscribe(
                data => {
                  this.listaAmigos.push(data);
                  this.emailsAmigos.push(data.email);
                }
              );
            } else if (data[i].emailRemetente == localStorage.getItem("email")) {
              this.service.getCientist(data[i].emailMandatario).subscribe(
                data => {
                  this.listaAmigos.push(data);
                  this.emailsAmigos.push(data.email);
                }
              );
            }
          }
        }
      }
    );
      let aux = [this.emailsAmigos];
      let auxDet = [this.emailsAmigosDet];
      let intersection = aux.filter(x => auxDet.includes(x));
      console.log(aux);
      console.log(auxDet);
      console.log(intersection);
  }

  verificaRecomendar() {
    this.service.listaRecomendacao()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if ((
            data[i].emailRecomendou == localStorage.getItem("email")
            && data[i].emailRecomendada == localStorage.getItem("det_email"))
            && data[i].desfazer == false) {
            this.recomendou = true;
          } else if ((
            data[i].emailRecomendou == localStorage.getItem("email")
            && data[i].emailRecomendada == localStorage.getItem("det_email"))
            && data[i].desfazer == true) {
            this.recomendou = false;
          } else {
            this.recomendou = false;
          }
        }
      })
  }

  recomendar() {
    let existe: boolean;

    this.service.listaRecomendacao().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRecomendada == localStorage.getItem("det_email") &&
            data[i].emailRecomendou == localStorage.getItem("det_email")) {
            existe = true;
          }
        }
      }
    );
    this.pessoaRecomendada.emailRecomendou = localStorage.getItem("email");
    this.pessoaRecomendada.emailRecomendada = localStorage.getItem("det_email");
    this.pessoaRecomendada.desfazer = false;

    if (!existe) {
      this.service.addRecomendacao(this.pessoaRecomendada).subscribe(data => { });
    } else {
      this.service.recomenda(this.pessoaRecomendada).subscribe(data => { });
    }

    this.service.getCientist(localStorage.getItem("det_email")).subscribe(
      data => {
        data.curtida++;
        this.service.atualizarPerfil(data).subscribe(x => {
        })
      }
    );
    this.curtir++;
    this.recomendou = true;
  }

  desrecomendar() {
    let existe: boolean;

    this.service.listaRecomendacao().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRecomendada == localStorage.getItem("det_email") &&
            data[i].emailRecomendou == localStorage.getItem("det_email")) {
            existe = true;
          }
        }
      }
    );
    this.pessoaRecomendada.emailRecomendou = localStorage.getItem("email");
    this.pessoaRecomendada.emailRecomendada = localStorage.getItem("det_email");
    this.pessoaRecomendada.desfazer = true;

    if (!existe) {
      this.service.addRecomendacao(this.pessoaRecomendada).subscribe(data => { });
    } else {
      this.service.desrecomenda(this.pessoaRecomendada).subscribe(data => { });
    }

    this.service.getCientist(localStorage.getItem("det_email")).subscribe(
      data => {
        data.curtida--;
        this.service.atualizarPerfil(data).subscribe(x => {
        })
      }
    );
    this.curtir--;
    this.recomendou = false;
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

  Detalhe() {
    let email = localStorage.getItem("det_email");
    this.service.getCientist(email).subscribe(
      data => {
        let str = data.dataNascimento.toString();
        let array = str.split("-");
        let final = array[2] + "/" + array[1] + "/" + array[0];
        this.cientista.dataNascimento = final.toString();

        let str2 = data.inicioDaAtividade;
        const now = new Date();
        const past = new Date(str2);
        const dif = Math.abs(now.getTime() - past.getTime());
        const days = Math.floor(dif / (1000 * 60 * 60 * 24));

        if (days < 365) {
          let final2 = Math.floor(days / 30);
          this.cientista.inicioDaAtividade = final2.toString() + " mes(es)";
        } else {
          let final2 = Math.floor(days / 365);
          this.cientista.inicioDaAtividade = final2.toString() + " ano(s)";
        }

        this.curtir = data.curtida;
        this.pessoa = data;
        this.interesses = data.interesse.split(",");
      }
    )
  }

}
