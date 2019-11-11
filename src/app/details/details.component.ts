import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Amizade } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pessoa: Pessoa;
  interesses: any;
  auth: boolean = false;
  desabilitaSolicitacao = false;
  amizade: Amizade = new Amizade();

  constructor(private service: ServiceService, private router: Router) {
  }

  ngOnInit() {
    this.Detalhe();
    this.verificaSolicitacao();
  }

  solicitarAmizade() {
    this.amizade.emailMandatario = localStorage.getItem("email");
    this.amizade.emailRemetente = localStorage.getItem("det_email");
    this.amizade.aceite = false;
    this.amizade.recusado = false;
    this.amizade.solicitado = true;
    this.desabilitaSolicitacao = this.amizade.solicitado;

    this.service.solicitaAmizade(this.amizade).subscribe(data => { this.amizade = data });
  }

  verificaSolicitacao() {
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("det_email")
            && data[i].emailMandatario == localStorage.getItem("email")
            && (data[i].solicitado == true || data[i].aceite == true || data[i].recusado == true)) {
            this.desabilitaSolicitacao = true;
          }
        }
      }
    )
  }

  Detalhe(){
    let id = localStorage.getItem("det_id");
    this.service.getCientist(id).subscribe(
      data => {
        this.pessoa = data;
        this.interesses = data.interesse.split(",");
      }
    )
  }

  gotoList(){
    this.router.navigateByUrl('/cientists');
  }

}
