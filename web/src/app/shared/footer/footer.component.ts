import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Environments } from '../constant/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public appName = environment.application.name;
  public version = environment.version.current;
  public currentYear = (new Date()).getFullYear();
  public environment = environment.application.environment;
  public supportEmail = environment.application.supportEmail;

  environmentClass = '';

  constructor() { }

  ngOnInit(): void {
    if (this.environment === Environments.Local) {
      this.environmentClass = 'badge badge-danger';
    } else if (this.environment === Environments.Development) {
      this.environmentClass = 'badge badge-warning';
    } else if (this.environment === Environments.Staging) {
      this.environmentClass = 'badge badge-info';
    } else {
      this.environmentClass = 'badge badge-success';
    }
  }

}
