import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PessoaNome } from '../model/pessoa';
import { AuthService } from '../service/auth.service';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  pessoaNome: PessoaNome;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public service: ServiceService,
    public router: Router) {
    this.searchForm = this.formBuilder.group({
      nome: ''
    });
    this.pessoaNome = {
      nome: ''
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.pessoaNome.nome = this.searchForm.get('nome').value;
    localStorage.setItem("nome_pesquisa", this.pessoaNome.nome);
  }

}
