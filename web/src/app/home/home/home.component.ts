import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //#region  permissions
  defaultAccess = false;
  //#endregion

  constructor(private authService: AuthService) { }

  ngOnInit() {

    //#region permissions

    this.isDefaultAccess();
    //#endregion
  }

  isDefaultAccess() {
    this.defaultAccess = this.authService.isDefaultAccess();
  }

}
