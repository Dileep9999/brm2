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
  sitemenu: String[] = JSON.parse(localStorage.getItem("sites"));
  statusmenu: String[];
  legalproductcategory: String[];
  projectmenu: String[];
  manudatemenu: String[];
  partnermenu: String[];
  filteritems: String[];
  Tile: boolean;
  requests: String[];
  loader: boolean = true;
  departments: String[];
  no_of_BR: any;
  columnDefs = [
    { headerName: 'Request Number', field: 'request_id' },
    { headerName: 'Project Name', field: 'project' },
    { headerName: 'Request For', field: 'requestfor' },
    { headerName: 'Submitter', field: 'createdBy' },
    { headerName: 'Created Date', field: 'createdAt' },
    { headerName: 'Status', field: 'status' },
    // { headerName: 'Manufacturing Date', field: 'manufacturedate' },
    // { headerName: 'Batch Number', field: 'batchnumber' },
    // { headerName: 'Site', field: 'site' },
    // { headerName: 'Actions', field: 'actions' }
  ];

  rowData = [
    { request_id: 'Toyota', pname: 'Celica', requestfor: "approver", submitter: "gjhm" },
    { make: 'Ford', model: 'Mondeo', price: 32000, cost: 50 },
    { make: 'Porsche', model: 'Boxter', price: 72000, cost: 50 }
  ];


  constructor(public authService: AuthService,
    public http: Http,
    public router: Router) {


  }
  ngOnInit() {
    this.requests = [];
    this.departments = [];
    this.sitemenu = [];
    this.projectmenu = [];
    this.Tile = true;
    this.loadrequests();
    this.sitemenuload();
    this.projectloadanddept();
    this.typemenu = ['Bulk Filling', 'GxP Lab Batch', 'GxP Others', 'GxP Pilot Batch', 'Not GxP Others', 'Not GxP Pilot Batch', 'Re-Conditioning'];
    this.statusmenu = ['Cancelled', 'Complete', 'COnfirmed', 'Filled', 'New', 'Ready for Filling', 'Reserved', 'Sample Released', 'Submitted', 'Weighed'];
    this.legalproductcategory = ['Cosmetic', 'Drug'];
    this.partnermenu = ['BRM Partner'];
    this.filteritems = [];
    this.manudatemenu = ['After 1 month', 'After 2 months', 'Next 30 days', 'Next 7 days'];

  }

  loadrequests() {
    this.authService.getallrequests().subscribe(data => {
      this.requests = data.data;
      console.log(this.requests);
      this.rowData = data.data;
      this.loader = false;
      this.no_of_BR = data.data.length;
    });
  }


  sitemenuload() {
    this.authService.getsites().subscribe(data => {
      for (let i = 0; i <= data.data.length - 1; i++) {
        this.sitemenu.push(data.data[i].site);
      }
      localStorage.setItem('sites', JSON.stringify(this.sitemenu));

    });
  }


  projectloadanddept() {

    this.authService.getprojects().subscribe(data => {
      if (data.success) {
        console.log(data.data.length);
        for (let i = 0; i <= data.data.length - 1; i++) {
          this.projectmenu.push(data.data[i].project);
        }
        localStorage.setItem('projects', JSON.stringify(this.projectmenu));
      }
    });
    this.authService.getdepartments().subscribe(data => {
      if (data.success) {
        console.log(data.data.length);
        for (let i = 0; i <= data.data.length - 1; i++) {
          this.departments.push(data.data[i].department);
        }
        localStorage.setItem('departments', JSON.stringify(this.departments));
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
          this.loadrequests();
          this.sitemenuload();
          this.projectloadanddept();
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
