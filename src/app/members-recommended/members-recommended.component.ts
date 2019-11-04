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

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getPessoas();
  }

  getPessoas(){
    this.service
    .findByName(localStorage.getItem("nome_pesquisa"))
    .subscribe(
      data => {
        this.cientists = data;
      }
    );
  }

  gotoDetails(cientist: Pessoa){
    localStorage.setItem("det_id", cientist.email);
    this.router.navigate(['details']);
  }
}
