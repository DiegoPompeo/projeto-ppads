import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Pessoa } from '../model/pessoa';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      empresa: '',
      inicioDaAtividade: '',
      dataNascimento:  '',
      nivelEscolaridade:  '',
      cidade:  '',
      estado:  '',
      salario:  '',
      interesse: '',
    });
    this.pessoa = {
      id: null,
      nome: '',
      email: '',
      senha: '',
      nroCartao: '',
      nomeNoCartao: '',
      dataValidade: '',
      codSeg: '',
      empresa: '',
      inicioDaAtividade: '',
      dataNascimento:  '',
      nivelEscolaridade:  '',
      cidade:  '',
      estado:  '',
      salario:  '',
      interesse: '',
      curtida: 0,
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
          this.pessoa.empresa = this.registerForm.get('empresa').value;

          this.pessoa.nroCartao = this.registerForm.get('nroCartao').value;
          this.pessoa.nomeNoCartao = this.registerForm.get('nomeNoCartao').value;
          this.pessoa.dataValidade = this.registerForm.get('dataValidade').value;
          this.pessoa.codSeg = this.registerForm.get('codSeg').value;
          
          this.pessoa.inicioDaAtividade = this.registerForm.get('inicioDaAtividade').value.toString();
          this.pessoa.dataNascimento = this.registerForm.get('dataNascimento').value.toString();
          this.pessoa.nivelEscolaridade = this.registerForm.get('nivelEscolaridade').value;
          this.pessoa.cidade = this.registerForm.get('cidade').value;
          this.pessoa.estado = this.registerForm.get('estado').value;
          this.pessoa.salario = this.registerForm.get('salario').value;

          this.pessoa.paga = this.submitted;
              
          this.authService.register(this.pessoa).subscribe(data => { 
          });
          this.msgSuccess = true;
          this.router.navigate(['register-success'])
        } else {
          this.msgError = true;
        }
      }
    );
    
  }
}
