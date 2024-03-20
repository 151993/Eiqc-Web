import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  projectName = environment.application.name;
  version = environment.version.current;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  signIn(): void {
    this.authService.signOut();
  }

}
