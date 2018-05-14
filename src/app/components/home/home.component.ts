import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user_id: String;
  loginmessage: String;
  userid_email: String;
  color: String;
  password: String;
  typemenu: String[];
  manufacturingdatemenu: String[];
  sitemenu: String[];
  statusmenu: String[];
  legalproductcategory: String[];
  projectmenu: String[];
  manudatemenu: String[];
  partnermenu: String[];
  filteritems: String[];
  Tile: boolean;


  constructor(public authService: AuthService,
    public http: Http,
    public router: Router) {

  }
  ngOnInit() {
    this.Tile = true;
    this.typemenu = ['Bulk Filling', 'GxP Lab Batch', 'GxP Others', 'GxP Pilot Batch', 'Not GxP Others', 'Not GxP Pilot Batch', 'Re-Conditioning'];
    this.sitemenu = [];
    this.sitemenuload();
    this.statusmenu = ['Cancelled', 'Complete', 'COnfirmed', 'Filled', 'New', 'Ready for Filling', 'Reserved', 'Sample Released', 'Submitted', 'Weighed'];
    this.legalproductcategory = ['Cosmetic', 'Drug'];
    this.partnermenu = ['BRM Partner'];
    this.filteritems = [];
    this.manudatemenu = ['After 1 month', 'After 2 months', 'Next 30 days', 'Next 7 days'];

  }

  sitemenuload() {
    this.authService.getsites().subscribe(data => {
      for (let i = 0; i => data.data.length - 1; i++) {
        this.sitemenu.push(data.data[i].site);
      }
    });
  }

  enterlogin(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }



  login() {
    console.log("Login");

    if (!this.userid_email || !this.password) {
      this.loginmessage = 'Enter Username/Password'
    }
    let user = {
      userid_email: this.userid_email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.user.user_type === 'SUPERADMIN') {
        this.router.navigate(['/su']);
      } else
        if (data.success) {
          console.log(data.user.email);
          console.log(data.user.user_id);
          console.log(data.user.user_type);
          this.user_id = data.user.user_id;
          this.authService.getUserdata(data.user.email, data.user.user_id, data.user.user_type);
          this.authService.storeUserData(data.token, data.user.user_id, data.user.user_type);

        } else {
          this.loginmessage = 'Invalid Credentilas';
        }

    });
  }


  appendtofilteritems(type) {
    console.log(type)
    this.filteritems.push(type);
    console.log(this.filteritems);

  }

  closefilter(item) {
    for (let i = this.filteritems.length - 1; i >= 0; i--) {
      if (this.filteritems[i] === item) {
        this.filteritems.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
      }
    }


  }
  fun(group) {
    console.log(group.value);

  }

  tiletoggle(value) {
    console.log(value);
    if (value === 'Tile') {
      document.getElementById("Tile").className = "btn btn-primary";
      document.getElementById("List").className = "btn";
      this.Tile = true;
    }
    if (value === 'List') {
      document.getElementById("List").className = "btn btn-primary";
      document.getElementById("Tile").className = "btn";
      this.Tile = false;
    }

    let x = document.getElementById("Tile").className
    // console.log(x);
    if (this.Tile) {
      document.getElementById("Tile").className = "btn btn-primary";
    } else {
      document.getElementById("List").className = "btn btn-primary";
    }


  }

  starcolor() {
    if (this.color === 'accent') {
      this.color = '';
    } else {
      this.color = 'accent';
    }
  }


}
