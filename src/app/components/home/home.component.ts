import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Rmrequest } from '../navbar/navbar.component';
import { LowerCasePipe } from '@angular/common';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { HostListener } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  expanded: boolean = true;
  mode: String;
  request = false;
  favorites = false;
  allrequets = true;

  startDate: Date = new Date;
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
  fav_req_ids: any;
  requests: any;
  batchrequests: String[];
  fillingrequests: String[];
  RMrequests: String[];
  loader: boolean = true;
  list = false;
  tile = true;
  departments: String[];
  my_req: any;
  fav_req: any;
  no_of_BR: any;
  no_of_FR: any;
  no_of_RM: any;
  columnDefs = [
    { headerName: 'Request Number', field: 'request_id' },
    { headerName: 'Project Name', field: 'project' },
    { headerName: 'Submitter', field: 'createdBy' },
    { headerName: 'Created Date', field: 'createdAt' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'UpdatedAt', field: 'lastModified' },


  ];

  rowData = [
  ];
  loadcard: String[];
  panelOpenState: any;
  prefrences: any;

  constructor(public authService: AuthService,
    public http: Http,
    public dialog: MatDialog,
    public snotify: SnotifyService,
    public router: Router) {


  }
  scroll = (): void => {
    let a = window.pageYOffset;
    if (a > 30) {
      this.expanded = false;
    } else if (a < 30) {
      this.expanded = true;
    }


  }
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    // setTimeout(() => {
    //   this.expanded = false;
    // }, 7000);


    this.loadcard = ['a', 'a', 'aa', 'a', 'a'];
    this.batchrequests = [];
    this.requests = [];
    this.fillingrequests = [];
    this.RMrequests = [];
    this.departments = [];
    this.sitemenu = [];
    this.projectmenu = [];
    this.Tile = true;
    this.my_req = [];
    this.fav_req = [];
    this.sitemenuload();
    this.projectloadanddept();
    this.typemenu = ['Bulk Filling', 'GxP Lab Batch', 'GxP Others', 'GxP Pilot Batch', 'Not GxP Others', 'Not GxP Pilot Batch', 'Re-Conditioning'];
    this.statusmenu = ['Cancelled', 'Complete', 'COnfirmed', 'Filled', 'New', 'Ready for Filling', 'Reserved', 'Sample Released', 'Submitted', 'Weighed'];
    this.legalproductcategory = ['Cosmetic', 'Drug'];
    this.partnermenu = ['BRM Partner'];
    this.filteritems = [];
    this.manudatemenu = ['Today', 'Yesterday', 'Tommorow', 'After 1 month', 'After 2 months', 'Next 30 days', 'Next 7 days'];
    this.loadrequests();

  }
  getprefrences() {
    this.authService.getprefrences().subscribe(data => {
      if (data.success) {
        console.log(data);
        this.prefrences = data.data;


        if (this.prefrences.request_filter.mode === 'TILE') {
          this.tile1();
        } else {
          this.list1();
        }
        switch (this.prefrences.request_filter.view) {
          case "MY REQUEST":
            this.request1();
            break;
          case "FAVOURITES":
            this.favorites1();
            break;
          case "ALL REQUESTS":
            this.allrequests1();
            break;
          default:
        }
      }
    });
  }


  delfav(id) {
    for (let i = 0; i <= this.requests.length - 1; i++) {
      if (id == this.requests[i].request_id) {
        this.requests[i].favorites = false;
      }
    }
    this.authService.deletefav(id).subscribe(data => {
      console.log('fav removed');
    });
  }


  favorites1() {
    if (this.favorites = true) {
      this.favorites = true;
    }
    else {
      this.favorites = !this.favorites;
    }
    this.allrequets = false;
    this.request = false;
    this.getfav();
  }
  request1() {
    if (this.request = true) {
      this.request = true;
    }
    else {
      this.request = !this.request;
    }
    this.allrequets = false;
    this.favorites = false;
    this.myreq();
  }
  allrequests1() {
    if (this.allrequets = true) {
      this.allrequets = true;
    }
    else {
      this.allrequets = !this.allrequets;
    }
    this.request = false;
    this.favorites = false;
    this.allreq();

  }
  list1() {
    if (this.list = true) {
      this.list = true;
    }
    else {
      this.list = !this.list;
    }
    this.tile = false;
    this.Tile = false;
  }
  tile1() {
    if (this.tile = true) {
      this.tile = true;
    }
    else {
      this.tile = !this.tile;
    }
    this.list = false;
    this.Tile = true;
  }







  getfav() {

    this.batchrequests = [];
    this.fillingrequests = [];
    this.RMrequests = [];
    this.requests.map(data => {
      if (data.request_type === 'BATCH REQUEST' && data.favorites == true) {
        this.batchrequests.push(data);
      } else if (data.request_type === 'FILLING REQUEST' && data.favorites == true) {
        this.fillingrequests.push(data);
      }
      else if (data.request_type === 'BATCH RM ORDER' && data.favorites == true) {
        this.RMrequests.push(data);
      }
    })

    // for (let i = 0; i <= this.requests.length - 1; i++) {
    //   if (this.requests[i].request_type === 'BATCH REQUEST' && this.requests[i].favorites == true) {
    //     this.batchrequests.push(this.requests[i]);
    //   } else if (this.fav_req[i].request_type === 'FILLING REQUEST' && this.requests[i].favorites == true) {
    //     this.fillingrequests.push(this.requests[i]);
    //   }
    //   else if (this.fav_req[i].request_type === 'BATCH RM ORDER' && this.requests[i].favorites == true) {
    //     this.RMrequests.push(this.requests[i]);
    //   }

    // }


    this.loader = false;



  }

  PresentInArray(element, arr) {
    const filtered_arr = arr.filter(e => e.request_id === element);
    filtered_arr.length ? true : false;
  }



  addfav(id) {

    for (let i = 0; i <= this.requests.length - 1; i++) {
      if (id == this.requests[i].request_id) {
        this.requests[i].favorites = true;
      }
    }
    this.allreq();
    this.authService.addfav(id).subscribe(data => {
      console.log('fav added');

    });
  }

  batchreq(req) {


    this.authService.req = req;
    this.authService.permission = true;
    this.router.navigate(['/batchrequest']);

  }

  myreq() {

    this.batchrequests = [];
    this.fillingrequests = [];
    this.RMrequests = [];


    for (let i = 0; i <= this.my_req.length - 1; i++) {
      if (this.my_req[i].request_type === 'BATCH REQUEST') {
        this.batchrequests.push(this.my_req[i]);
      } else if (this.my_req[i].request_type === 'FILLING REQUEST') {
        this.fillingrequests.push(this.my_req[i]);
      }
      else if (this.my_req[i].request_type === 'BATCH RM ORDER') {
        this.RMrequests.push(this.my_req[i]);
      }
    }
    this.loader = false;
  }


  allreq() {
    this.batchrequests = [];
    this.fillingrequests = [];
    this.RMrequests = [];


    for (let i = 0; i <= this.requests.length - 1; i++) {
      if (this.requests[i].request_type === 'BATCH REQUEST') {
        this.batchrequests.push(this.requests[i]);
      } else if (this.requests[i].request_type === 'FILLING REQUEST') {
        this.fillingrequests.push(this.requests[i]);
      }
      else if (this.requests[i].request_type === 'BATCH RM ORDER') {
        this.RMrequests.push(this.requests[i]);
      }
    }
    this.loader = false;
  }


  loadrequests() {
    this.authService.getallrequests().subscribe(data => {
      this.requests = data.data;

      this.authService.getfav().subscribe(data => {
        this.fav_req = data.data;


        for (let l = 0; l <= this.requests.length - 1; l++) {
          if (this.requests[l].status === "New") {
            this.requests[l].percent = 25;
          } else if (this.requests[l].status === "Submitted") {
            this.requests[l].percent = 50;
          } else if (this.requests[l].status === "Reserved") {
            this.requests[l].percent = 75;

          } else if (this.requests[l].status === "Cancelled") {
            this.requests[l].percent = 100;
          } else if (this.requests[l].status === "Confirmed") {
            this.requests[l].percent = 80;
          }
        }

        for (let k = 0; k <= this.requests.length - 1; k++) {
          for (let j = 0; j <= this.fav_req.length - 1; j++) {
            this.fav_req[j].favorites = true;
            if (this.requests[k].request_id === this.fav_req[j].request_id) {
              this.requests[k].favorites = true;
            }
          }
        }
      });


      for (let i = 0; i <= this.requests.length - 1; i++) {
        if (this.requests[i].createdBy === this.authService.user_id) {
          this.my_req.push(this.requests[i]);
        }
      }

      for (let i = 0; i <= this.requests.length - 1; i++) {
        if (this.requests[i].request_type === 'BATCH REQUEST') {
          this.batchrequests.push(this.requests[i]);
        } else if (this.requests[i].request_type === 'FILLING REQUEST') {
          this.fillingrequests.push(this.requests[i]);
        }
        else if (this.requests[i].request_type === 'BATCH RM ORDER') {
          this.RMrequests.push(this.requests[i]);
        }
        else {
          this.RMrequests.push(data.data[i]);
        }
      }



      this.getprefrences();
      this.loader = false;
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

        for (let i = 0; i <= data.data.length - 1; i++) {
          this.projectmenu.push(data.data[i].project);
        }
        localStorage.setItem('projects', JSON.stringify(this.projectmenu));
      }
    });
    this.authService.getdepartments().subscribe(data => {
      if (data.success) {

        for (let i = 0; i <= data.data.length - 1; i++) {
          this.departments.push(data.data[i].department);
        }
        localStorage.setItem('departments', JSON.stringify(this.departments));
      }
    });
  }


  appendtofilteritems(type) {

    this.filteritems.push(type);

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
  openDialog(): void {
    let dialogRef = this.dialog.open(DateRange1, {
      width: '280px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.prefrences.request_filter.filters.manufacturing_date = [];
      this.prefrences.request_filter.filters.manufacturing_date.push(result.from);
      this.prefrences.request_filter.filters.manufacturing_date.push(result.to);
      console.log('The dialog was closed');

    });
  }


  tiletoggle(value) {

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


}





@Component({
  selector: 'dialog-date-Range',
  templateUrl: 'daterange.html',
})

export class DateRange1 {
  date1: Date;
  date2: Date;
  date3: String;
  date4: String;

  btndisabled: boolean = true;



  constructor(
    public dialogRef: MatDialogRef<DateRange1>,
    private router: Router,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {


  }

  formatdate() {
    let day = this.date1.getDate();
    let month = this.date1.getMonth() + 1;
    let year = this.date1.getFullYear();
    this.date3 = year + '-' + month + '-' + day;
    let day1 = this.date2.getDate();
    let month2 = this.date2.getMonth() + 1;
    let year2 = this.date2.getFullYear();
    this.date4 = year2 + '-' + month2 + '-' + day1;

  }

  submit() {
    console.log(this.date1, this.date2);

    this.formatdate();
    let data = {
      from: this.date3,
      to: this.date4
    }

    this.dialogRef.close(data);
  }
  submitenable(
  ) {
    if (this.date1 != undefined && this.date2 != undefined) {
      this.btndisabled = false;
    }
  }


}