import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members-recommended',
  templateUrl: './members-recommended.component.html',
  styleUrls: ['./members-recommended.component.css']
})
export class MembersRecommendedComponent implements OnInit {

  pessoa: Pessoa;
  cientist: Pessoa;
  cientists: Pessoa[] = new Array();
  resultado: string;

  constructor(private service: ServiceService, private router: Router) { }

  gotoDetails(cientista: Pessoa){
    localStorage.setItem("det_email", cientista.email);
    this.router.navigate(["details"]);
  }

  ngOnInit() {
    this.getPessoas();
    this.resultado = localStorage.getItem("nome_pesquisa");
  }

  getPessoas(){    
    let nome = localStorage.getItem("nome_pesquisa");    
    this.service.listar().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          let interesses = data[i].interesse.split(",");
          for (let j = 0; j < interesses.length; j++) {
            if (interesses[j] == nome) {
              this.cientists.push(data[i]);
            }            
          }         
        }
      }
    );
  }
}
