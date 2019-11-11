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

  cientist: Pessoa;
  cientistas: Pessoa[];
  post: Post;
  posts: Post[];
  atualiza = false;
  solicita: Pessoa[] = new Array<Pessoa>();
  mandatario: Pessoa = new Pessoa();

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.searchProfile();
    this.searchPosts();
    this.listaSolicitacao();
  }

  searchPosts() {
    this.service.verPost(localStorage.getItem("email"))
    .subscribe(data => {
      this.posts = data.slice();
    });
  }

  searchProfile() {
    this.service.getCientist(localStorage.getItem("email"))
      .subscribe(data => {
        this.cientist = data;
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
          if (data[i].aceite == false && data[i].recusado == false 
            && data[i].emailMandatario == p.email && data[i].emailRemetente == localStorage.getItem("email")
            && data[i].solicitado == true) {
            data[i].aceite = true;
            this.service.atualizaSolicitacao(data[i]).subscribe(data => {});
            this.solicita.splice(i);
          }
        }
      }
    );
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
            data[i].recusado = true;
            this.solicita.splice(i);
            this.service.atualizaSolicitacao(data[i]).subscribe(data => {});            
          }
        }
      }
    );
  }

  listaSolicitacao(){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("email")
          && (data[i].aceite == false && data[i].recusado == false) && data[i].solicitado == true) {
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
