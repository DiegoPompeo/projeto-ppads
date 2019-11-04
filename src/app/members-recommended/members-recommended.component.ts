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
  cientists: Pessoa[];
  resultado: string;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getPessoas();
    this.resultado = localStorage.getItem("nome_pesquisa");
  }

  getPessoas(){    
    let nome = localStorage.getItem("nome_pesquisa");    
    this.service
    .findByName(nome)
    .subscribe(
      data => {
        this.cientists = data;
      }
    );
  }
}
