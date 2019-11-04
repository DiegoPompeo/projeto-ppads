import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-glossary-success',
  templateUrl: './glossary-success.component.html',
  styleUrls: ['./glossary-success.component.css']
})
export class GlossarySuccessComponent implements OnInit {
  @Input()
  selecionados = [];

  constructor() { }

  ngOnInit() {
  }

}
