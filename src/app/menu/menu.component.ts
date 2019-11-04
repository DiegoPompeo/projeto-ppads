import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pessoa } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  searchForm: FormGroup;
  pessoa: Pessoa;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService, 
    public service: ServiceService,
    public router: Router) { 
    this.searchForm = this.formBuilder.group({
      nome: ''
    });    
  }

  ngOnInit() {
  }

  onSubmit(){
    localStorage.setItem("nome_pesquisa", this.searchForm.get('nome').value);
  }

  logout() {
    this.authService.logout();
  }
}
