import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wel-come',
  templateUrl: './wel-come.component.html',
  styleUrls: ['./wel-come.component.css']
})
export class WelComeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  signIn() {
    window.open(environment.signInUrl);
  }

  register() {
    window.open(environment.registerUrl);
  }

}
