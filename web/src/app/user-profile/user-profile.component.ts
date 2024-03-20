import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number;
  userInfo: User;
  constructor(
    private authService: AuthService,
    private apiService: UserService
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    if (this.userId != null) {
      this.apiService.getDataById(this.userId).subscribe(data => {
        console.log(data);
        this.userInfo = new User(data);
      });
    }
  }
}
