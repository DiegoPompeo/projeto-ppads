import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa, PessoaLogin } from '../model/pessoa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    url = 'https://server-redesocial.herokuapp.com/redesocial';

    constructor(private httpClient: HttpClient, private router: Router) { }

    register(pessoa: Pessoa): Observable<any> {
        return this.httpClient.post(this.url + "/signup", pessoa);
    }

    login(pessoaLogin: PessoaLogin){
        return this.httpClient.post(this.url + "/login", pessoaLogin)
        .pipe(map(data =>{            
            if(data != null){
                localStorage.setItem('email', pessoaLogin.email);
                localStorage.setItem('senha', pessoaLogin.senha);
                return true;
            }
            return false;
        }));
    }

    isAuthenticated(): boolean{
        return localStorage.getItem('email') != null;
    }
    
    verificaEmail(email: string){
        return this.httpClient.get<boolean>(this.url + "/email/" + email);
    }

    logout(){
        localStorage.clear();
        this.router.navigateByUrl('login');
    }
}
