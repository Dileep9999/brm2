import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_id: String;
  loginmessage: String;
  userid_email: String;
  password: String;
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/home']);
    }
    if (this.authService.user_type === 'SUPERADMIN') {
      this.router.navigate(['/su']);
    }
  }
  enterlogin(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }



  login() {
    console.log("Login");

    if (!this.userid_email || !this.password) {
      this.loginmessage = 'Enter Username/Password';

    } else {
      let user = {
        userid_email: this.userid_email,
        password: this.password
      }
      this.authService.authenticateUser(user).subscribe(data => {
        if (data.user.user_type === 'SUPERADMIN') {
          this.authService.getUserdata(data.user.email, data.user.user_id, data.user.user_type);
          this.authService.storeUserData(data.token, data.user.user_id, data.user.user_type);
          this.router.navigate(['/su']);
        } else
          if (data.success) {
            this.router.navigate(['/home']);
            this.user_id = data.user.user_id;
            this.authService.getUserdata(data.user.email, data.user.user_id, data.user.user_type);
            this.authService.storeUserData(data.token, data.user.user_id, data.user.user_type);
            localStorage.setItem('prefrences', JSON.stringify(data.data.prefrences));
          } else {
            this.loginmessage = 'Invalid Credentilas';
          }
      });
    }

  }



}
