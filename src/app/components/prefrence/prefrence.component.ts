import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, DateAdapter } from '@angular/material';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prefrence',
  templateUrl: './prefrence.component.html',
  styleUrls: ['./prefrence.component.css']
})
export class PrefrenceComponent implements OnInit {
  checked: boolean;
  batch = true;
  batchrm = false;
  calender_view: String;
  tile = true;
  list = false;
  mode: String;
  request = true;
  favorites = false;
  allrequets = false;
  drug = false;
  cosmetic = true;
  view: String;
  legal_product_category: String;
  lab = false;
  pilot = true;
  other = false;
  batch_type: String;
  projects = JSON.parse(localStorage.getItem('projects'));
  departments = JSON.parse(localStorage.getItem('departments'));
  sitemenu: String[];
  sitetype: String;
  bm_req_check: boolean = true;
  rm_req_check: boolean = true;
  fr_req_check: boolean = true;
  gxpvalue: boolean = true;
  myreq: String;
  formula_req_contents: boolean = false;
  req_con_boolean: boolean = true;
  typemenu: String[];
  mfgdatetype: String[];
  filteritems: String[];
  calender_sitetype: any;
  startDate: Date = new Date;
  partnermenu: String[];
  statusmenu: String[];
  legalproductcategory: String[];
  saveload: boolean = false;

  prefrences: any =
    {
      createdAt: "",
      user_id: "",
      formula_request_contents: "SPEC NUMBER",
      request_contents: {
        batch_type: "PILOT",
        legal_product_category: "COSMETIC",
        site: "VJC"
      },
      request_filter: {
        filters: {
          partner: [

          ],
          project: [

          ],
          status: [

          ],
          legal_product_category: [

          ],
          site: [

          ],
          manufacturing_date: [

          ],
          batch_type: [

          ],
          gxp: false
        },
        my_requests: "OPEN TASK",
        view: "ALL REQUESTS",
        mode: "TILE"
      },
      home_view: {
        my_requests: {
          rm_request: true,
          filling_request: true,
          batch_request: true
        }
      },
      calender_view: {
        batch_type: "LAB",
        legal_product_category: "COSMETIC",
        site: "VJC",
        request_type: "BATCH REQUEST"
      }
    }




  constructor(
    public authService: AuthService,
    public snotify: SnotifyService,
    public dialog: MatDialog,
    public router: Router) { }



  ngOnInit() {
    this.checked = true;
    this.partnermenu = [];
    this.mfgdatetype = ['Today', 'Yesterday', 'Tommorow', 'After 1 month', 'After 2 months', 'Next 30 days', 'Next 7 days'];
    this.sitemenu = JSON.parse(localStorage.getItem('sites'));
    this.typemenu = ['Bulk Filling', 'Re-Conditioning', 'LAB', ' PILOT', 'OTHERS'];
    this.filteritems = [];
    this.statusmenu = ["NEW", "PENDING", "CONFIRMED", "REJECTED", "CANCELLED", "RESERVED"];
    this.getprefrence();
    this.legalproductcategory = ['DRUG', 'COSMETIC']
  }


  getprefrence() {
    this.authService.getprefrences().subscribe(data => {
      if (data.success) {
        console.log(data);
        if (data.data) {
          this.prefrences = data.data;
        }

        switch (this.prefrences.calender_view.batch_type) {
          case "LAB":

            this.lab1();
            break;
          case "PILOT":
            this.pilot1();
            break;
          default:
            this.other1();
        }


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
          default:
            this.allrequests1();
        }

      }
    });
  }



  save() {
    this.saveload = true;
    let data = {
      calender_view_site: this.prefrences.calender_view.site,
      calender_view_legal_product_category: this.prefrences.calender_view.legal_product_category,
      calender_view_batch_type: this.prefrences.calender_view.batch_type,
      home_view_my_request_batch_request: this.prefrences.home_view.my_requests.batch_request,
      home_view_my_request_filling_request: this.prefrences.home_view.my_requests.filling_request,
      home_view_my_request_rm_request: this.prefrences.home_view.my_requests.rm_request,
      request_filter_mode: this.prefrences.request_filter.mode,
      request_filter_view: this.prefrences.request_filter.view,
      request_filter_my_requests: this.prefrences.request_filter.my_requests,
      request_filter_filter_gxp: this.prefrences.request_filter.filters.gxp,
      request_filter_filter_batch_type: this.prefrences.request_filter.filters.batch_type,
      request_filter_filter_manufacturing_date_today: false,
      request_filter_filter_manufacturing_date_yesterday: false,
      request_filter_filter_manufacturing_date_tomorrow: false,
      request_filter_filter_manufacturing_date_next_7_days: false,
      request_filter_filter_manufacturing_date_next_30_days: false,
      request_filter_filter_manufacturing_date_next_1_month: false,
      request_filter_filter_manufacturing_date_next_2_month: false,
      request_filter_filter_manufacturing_date_range_from: this.prefrences.request_filter.filters.manufacturing_date[0],
      request_filter_filter_manufacturing_date_range_to: this.prefrences.request_filter.filters.manufacturing_date[1],
      request_filter_filter_manufacturing_date: this.prefrences.request_filter.filters.manufacturing_date,
      request_filter_filter_site: this.prefrences.request_filter.filters.site,
      request_filter_filter_legal_product_category: this.prefrences.request_filter.filters.legal_product_category,
      request_filter_filter_status: this.prefrences.request_filter.filters.status,
      request_filter_filter_project: this.prefrences.request_filter.filters.project,
      request_filter_filter_partner: this.prefrences.request_filter.filters.partner,
      request_contents_site: this.prefrences.request_contents.site,
      request_contents_legal_product_category: this.prefrences.request_contents.legal_product_category,
      request_contents_batch_type: this.prefrences.request_contents.batch_type,
      formula_request_contents: this.prefrences.formula_request_contents
    }

    console.log(this.prefrences.request_filter.view);

    this.authService.submitprefrences(data).subscribe(data => {
      console.log('success');

      this.saveload = false;
      this.getprefrence();
      this.snotify.success('Prefrence Updated', 'Saved', {
        timeout: 2000,
        position: SnotifyPosition.rightTop,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true
      });
      // this.router.navigate(['/home']);

    });
  }


  emptyarray(value) {
    switch (value) {
      case "type":
        this.prefrences.request_filter.filters.batch_type = [];
        console.log(value);

        break;
      case "site":
        this.prefrences.request_filter.filters.site = [];
        break;
      case "leagalproduct":
        this.prefrences.request_filter.filters.legal_product_category = [];
        break;
      case "status":
        this.prefrences.request_filter.filters.status = [];
        break;
      case "project":
        this.prefrences.request_filter.filters.project = [];
        break;
      case "partner":
        this.prefrences.request_filter.filters.partner = [];
        break;
      case "mfgdate":
        this.prefrences.request_filter.filters.manufacturing_date = [];
        break;
      default:

    }

    // this.prefrences.request_filter.filters.batch_type = [];
  }


  appendtofilteritems(value, type) {
    switch (type) {
      case "type":

        if (this.prefrences.request_filter.filters.batch_type.indexOf(value) === 0) {

        } else {
          this.prefrences.request_filter.filters.batch_type.push(value);
        }


        break;
      case "site":
        if (this.prefrences.request_filter.filters.site.indexOf(value) === 0) {

        } else {
          this.prefrences.request_filter.filters.site.push(value);
        }

        break;
      case "leagalproduct":
        if (this.prefrences.request_filter.filters.legal_product_category.indexOf(value) === 0) {

        } else {
          this.prefrences.request_filter.filters.legal_product_category.push(value);
        }

        break;
      case "status":
        if (this.prefrences.request_filter.filters.status.indexOf(value) === 0) {

        } else {
          this.prefrences.request_filter.filters.status.push(value);
        }

        break;
      case "project":
        if (this.prefrences.request_filter.filters.project.indexOf(value) === 0) {

        } else {
          this.prefrences.request_filter.filters.project.push(value);
        }
        break;
      case "partner":
        if (this.prefrences.request_filter.filters.partner.indexOf(value) === 0) {

        } else {
          this.prefrences.request_filter.filters.partner.push(value);
        }

        break;
      case "mfgdate":
        // this.prefrences.request_filter.filters.manufacturing_date.push(value);
        break;
      default:
    }
    console.log(value, type);

  }

  closefilter(item) {
    for (let i = this.filteritems.length - 1; i >= 0; i--) {
      if (this.filteritems[i] === item) {
        this.filteritems.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
      }
    }


  }




  batch1() {
    if (this.batch = true) {
      this.batch = true;
    }
    else {
      this.batch = !this.batch;
    }
    this.batchrm = false;
    this.calender_view = "BATCH"

  }
  batchrm1() {
    if (this.batchrm = true) {
      this.batchrm = true;
    }
    else {
      this.batchrm = !this.batchrm;
    }
    this.batch = false;
    this.calender_view = "BATCH RM ORDER"
  }
  list1() {
    if (this.list = true) {
      this.list = true;
    }
    else {
      this.list = !this.list;
    }
    this.tile = false;

    this.prefrences.request_filter.mode = "LIST"
  }
  tile1() {
    if (this.tile = true) {
      this.tile = true;
    }
    else {
      this.tile = !this.tile;
    }
    this.list = false;

    this.prefrences.request_filter.mode = "TILE"
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
    this.prefrences.request_filter.view = "FAVOURITES"
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
    this.prefrences.request_filter.view = "REQUEST"
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
    this.prefrences.request_filter.view = "ALL REQUESTS";
  }
  drug1() {
    if (this.drug = true) {
      this.drug = true;
    }
    else {
      this.drug = !this.drug;
    }
    this.cosmetic = false;
    this.legal_product_category = "DRUG"
  }
  cosmetic1() {
    if (this.cosmetic = true) {
      this.cosmetic = true;
    }
    else {
      this.cosmetic = !this.cosmetic;
    }
    this.drug = false;
    this.legal_product_category = "COSMETIC"
  }
  pilot1() {
    // this.pilot=!this.pilot;
    if (this.pilot = true) {
      this.pilot = true;
    }
    else {
      this.pilot = !this.pilot;
    }
    this.other = false;
    this.lab = false;
    this.batch_type = "PILOT";
  }
  other1() {
    // this.other=!this.other;
    if (this.other = true) {
      this.other = true;
    }
    else {
      this.other = !this.other;
    }
    this.pilot = false;
    this.lab = false;
    this.batch_type = "OTHERS";
  }
  lab1() {
    // this.lab=!this.lab;
    if (this.lab = true) {
      this.lab = true;
    }
    else {
      this.lab = !this.lab;
    }
    this.pilot = false;
    this.other = false;
    this.batch_type = "LAB";
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(DateRange, {
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


}





@Component({
  selector: 'dialog-date-Range',
  templateUrl: 'daterange.html',
})

export class DateRange {
  date1: Date;
  date2: Date;
  date3: String;
  date4: String;

  btndisabled: boolean = true;



  constructor(
    public dialogRef: MatDialogRef<DateRange>,
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