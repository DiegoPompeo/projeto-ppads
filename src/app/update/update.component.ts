import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  registerForm: FormGroup;
  pessoa: Pessoa;
  submitted = false;
  msgError = false;
  msgSuccess = false;
  verificar: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      nome: '',
      email: '',
      senha: '',
      nroCartao: '',
      nomeNoCartao: '',
      dataValidade: '',
      codSeg: '',
      empresa: ''
    });
    this.pessoa = {
      id: +localStorage.getItem("id"),
      nome: '',
      email: '',
      senha: '',
      nroCartao: '',
      nomeNoCartao: '',
      dataValidade: '',
      codSeg: '',
      empresa: '',
      paga: null
    }
  }

  ngOnInit() {    
  }

  showContaPaga(){
    this.submitted = true;
  }

  hideContaPaga(){
    this.submitted = false;
  }

  onSubmit() {
    this.authService.verificaEmail(this.registerForm.get('email').value).subscribe(
      data => {
        this.verificar = data;
        if (!this.verificar) {     
          this.pessoa.nome = this.registerForm.get('nome').value;
          this.pessoa.email = this.registerForm.get('email').value;
          this.pessoa.senha = this.registerForm.get('senha').value;
          this.pessoa.nroCartao = this.registerForm.get('nroCartao').value;
          this.pessoa.nomeNoCartao = this.registerForm.get('nomeNoCartao').value;
          this.pessoa.dataValidade = this.registerForm.get('dataValidade').value;
          this.pessoa.codSeg = this.registerForm.get('codSeg').value;
          this.pessoa.empresa = this.registerForm.get('empresa').value;
          this.pessoa.paga = this.submitted;
    
          this.authService.register(this.pessoa).subscribe(data => {
            console.log('register success');            
          });
          this.msgSuccess = true;
        } else {
          this.msgError = true;
        }
      }
    );    
  }
}
