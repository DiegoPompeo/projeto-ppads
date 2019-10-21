import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PessoaLogin } from '../model/pessoa';
import { } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  pessoaLogin: PessoaLogin;
  msgError = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      senha: new FormControl()
    });
    this.pessoaLogin = {
      email: '',
      senha: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.pessoaLogin.email = this.loginForm.get('email').value;
    this.pessoaLogin.senha = this.loginForm.get('senha').value;

    this.authService.login(this.pessoaLogin).subscribe(
      data => {
        if (data) {
          this.router.navigateByUrl("profile");
        } else {
          console.log(this.pessoaLogin);
          this.msgError = true;
        }
      }
    );
  }
}
