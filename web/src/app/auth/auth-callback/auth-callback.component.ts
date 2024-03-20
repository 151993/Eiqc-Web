import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { LocalStorage } from 'src/app/shared/constant/global';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  projectName = environment.application.name;
  version = environment.version.current;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const returnUrl = localStorage.getItem(LocalStorage.ReturnUrl);
    this.authService.completeAuthentication().then(
      res => {
        this.authService.getUserPermissions(true).then(x => {
          if (returnUrl == null || returnUrl === '') {
            this.router.navigate(['Home']);
          } else {
            const newUrl = returnUrl.replace(
              environment.hostUrl.toLowerCase(),
              ''
            );
            if (newUrl.toLowerCase().includes('http')) {
              this.router.navigate(['Home']);
            }
            this.router.navigate([newUrl]);
          }
        });
      },
      err => {
        console.error('AuthCallbackComponent : completeAuthentication : err', err);
        this.router.navigate(['unauthorized']);
      }
    );
  }
}
