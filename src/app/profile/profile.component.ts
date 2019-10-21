import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  cientist: Pessoa;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.searchProfile();
  }

  searchProfile() {
    this.service.getCientist(localStorage.getItem("email"))
      .subscribe(data => {
        this.cientist = data;
      });
  }

  gotoUpdate(cientist: Pessoa) {
    localStorage.setItem("id", cientist.id.toString());
  }

}
