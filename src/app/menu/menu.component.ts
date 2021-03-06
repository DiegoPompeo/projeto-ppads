import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public service: ServiceService,
    public router: Router) {
  }

  ngOnInit() {
  }


  logout() {
    this.authService.logout();
  }
}
