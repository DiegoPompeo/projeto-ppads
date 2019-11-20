import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  submitted = false;
  pessoa: Pessoa = new Pessoa();
  up = false;

  constructor(private service: ServiceService, 
    private router: Router) { }

  ngOnInit() {
    this.edit();
  }

  downgrade(pessoa: Pessoa){
    pessoa.paga = false;
    pessoa.codSeg = '';
    pessoa.dataValidade = '';
    pessoa.nomeNoCartao = '';
    pessoa.nroCartao = '';
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  showContaPaga(){
    this.submitted = true;
  }

  hideContaPaga(){
    this.submitted = false;
  }

  Atualizar(pessoa: Pessoa){    
    pessoa.paga = this.submitted;
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa.dataNascimento = data.dataNascimento.toString();
        this.pessoa.inicioDaAtividade = data.inicioDaAtividade.toString();
        this.pessoa = data;
      }
    );
    this.up = true;
  }

  edit() {
    let email = localStorage.getItem("email");
    this.service.getCientist(email).subscribe(
      data => {
        this.submitted = this.pessoa.paga;
        this.pessoa = data;
      }
    );
  }
}
