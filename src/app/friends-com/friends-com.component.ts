import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from '../model/pessoa';

@Component({
  selector: 'app-friends-com',
  templateUrl: './friends-com.component.html',
  styleUrls: ['./friends-com.component.css']
})
export class FriendsComComponent implements OnInit {  
  
  amigosEmComum: Pessoa[] = new Array<Pessoa>();

  @Input("listaAmigosDetails")
  listaAmigosDetails: Pessoa[] = new Array<Pessoa>();

  @Input("listaAmigos")
  listaAmigos: Pessoa[] = new Array<Pessoa>();

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.listaAmigos.length; i++) {
      for (let j = 0; j < this.listaAmigosDetails.length; j++) {
        if (this.listaAmigos[i].email == this.listaAmigosDetails[j].email) {
          this.amigosEmComum.push(this.listaAmigos[i]);
        }        
      }      
    }
  }

}
