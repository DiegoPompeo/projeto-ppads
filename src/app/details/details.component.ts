import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Amizade, Post, PessoaRecomendada } from '../model/pessoa';
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
  pessoaRecomendada: PessoaRecomendada = new PessoaRecomendada();
  listaRecomendadas: PessoaRecomendada[];

  listaAmigos: Pessoa[] = new Array<Pessoa>();
  listaAmigosDetails: Pessoa[] = new Array<Pessoa>();
  amigosEmComum: Pessoa[] = new Array<Pessoa>();

  constructor(private service: ServiceService, private router: Router) {
  }

  gotoDetails(cientista: Pessoa){
    localStorage.setItem("det_email", cientista.email);
    this.router.navigate(["details"]);
  }

  ngOnInit() {
    this.Detalhe();
    this.searchPosts();
    this.verificaSolicitacao();
    this.getAmigos();
    this.getDetAmigos();
    this.intersecao();

    this.emailLogado = localStorage.getItem("email");
    if (!(this.emailLogado == localStorage.getItem("det_email"))) {
      this.auth = true;
    }
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
    this.pessoaRecomendada.emailRecomendada = localStorage.getItem("det_email");
    this.pessoaRecomendada.emailRecomendou = localStorage.getItem("email");
    this.pessoaRecomendada.desfazer = false;
    this.recomendou = true;

    this.service.addRecomendacao(this.pessoaRecomendada).subscribe(data => { });

    this.service.getCientist(localStorage.getItem("det_email")).subscribe(
      data => {
        data.curtida++;
        this.service.atualizarPerfil(data).subscribe(x => {
        })
      }
    );
  }

  desrecomendar() {
    this.pessoaRecomendada.emailRecomendada = localStorage.getItem("det_email");
    this.pessoaRecomendada.emailRecomendou = localStorage.getItem("email");
    this.pessoaRecomendada.desfazer = true;
    this.service.getCientist(localStorage.getItem("det_email")).subscribe(
      data => {
        data.curtida--;
        this.service.atualizarPerfil(data).subscribe(x => {
        })
      }
    );

    this.service.editRecomendacao(this.pessoaRecomendada).subscribe(
      data => {
      }
    );

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

  intersecao() {
    this.getAmigos();
    this.getDetAmigos();
    for (let i = 0; i < this.listaAmigos.length; i++) {
      for (let j = 0; j < this.listaAmigosDetails.length; j++) {
        if (this.listaAmigos[i].email == this.listaAmigosDetails[j].email) {
          this.amigosEmComum.push(this.listaAmigos[i]);
        }
      }
    }
  }

  getAmigos() {
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
            } else if (data[i].emailRemetente == localStorage.getItem("email")
              && (data[i].aceite == true)) {
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

  getDetAmigos() {
    return this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == true) {
            if (data[i].emailMandatario == localStorage.getItem("det_email")
              && (data[i].aceite == true)) {
              this.service.getCientist(data[i].emailRemetente).subscribe(
                data => {
                  this.listaAmigosDetails.push(data);
                }
              );
            } else if (data[i].emailRemetente == localStorage.getItem("det_email")
              && (data[i].aceite == true)) {
              this.service.getCientist(data[i].emailMandatario).subscribe(
                data => {
                  this.listaAmigosDetails.push(data);
                }
              );
            }
          }
        }
      }
    );
  }

}
