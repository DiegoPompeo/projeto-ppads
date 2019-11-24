import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friends-com',
  templateUrl: './friends-com.component.html',
  styleUrls: ['./friends-com.component.css']
})
export class FriendsComComponent implements OnInit {

  amigosEmComum = [];

  @Input("listaAmigosDetails")
  listaAmigosDetails = [];

  @Input("listaAmigos")
  listaAmigos = [];

  constructor() { }

  ngOnInit() {
    this.listaAmigosDetails.forEach(x => {
      this.listaAmigos.forEach(
        y => {
          if(x.email = y.email){
            this.amigosEmComum.push(x);
          }
        }
      );
    });
  }

}
