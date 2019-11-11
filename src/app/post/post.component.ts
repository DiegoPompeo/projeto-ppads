import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Post } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  registerForm: FormGroup;
  post: Post;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      conteudo: '',
      email: ''
    });
    this.post = {
      id: null,
      conteudo: '',
      email: '',
      curtidas: 0
    }
  }

  onSubmit() {
    this.post.conteudo = this.registerForm.get('conteudo').value;
    this.post.email = localStorage.getItem("email");
    this.submitted = true;
    this.service.addPost(this.post).subscribe(data => { 
    });
    this.ngOnInit();
  }
  
  ngOnInit() {
  }

}
