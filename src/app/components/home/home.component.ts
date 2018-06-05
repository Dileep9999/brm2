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


  expanded: boolean = false;
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
  partnermenu: any;
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
    { headerName: 'Fav', field: 'faourites', cellRenderer: this.customCellRendererFunc },
    { headerName: 'Request Number', field: 'request_id' },
    { headerName: 'Project Name', field: 'project' },
    { headerName: 'Submitter', field: 'createdBy' },
    { headerName: 'Created Date', field: 'createdAt' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'UpdatedAt', field: 'lastModified' },
  ];

  rowData = [

  ];
  angularCompileRows: true;
  public customCellRendererFunc(params): string {
    let cellContent: string = '';
    try {

      if (params.data.favorites) {
        cellContent += '<i class=" fa fa-star 2x " *ngIf="request.favorites" style="color:rgb(253, 253, 7) " (click)="delfav(request.request_id)"></i>';
      } else if (!params.data.favorites) {
        cellContent += '<i class="fa fa-star-o 2x" *ngIf="!request.favorites" (click)="addfav(request.request_id) "></i>';
      }

    } catch (exception) {

      console.error(exception);
    }

    return cellContent
  }
  loadcard: String[];
  panelOpenState: any;
  prefrences: any;


  constructor(public authService: AuthService,
    public http: Http,
    public dialog: MatDialog,
    public snotify: SnotifyService,
    public router: Router) {
    this.prefrences =
      {
        createdAt: "",
        user_id: "",
        formula_request_contents: "",
        request_contents: {
          batch_type: "",
          legal_product_category: "",
          site: ""
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
            manufacturing_date: {
              date_range: {
                from_date: '',
                to_date: ''
              }
            }

            ,
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

  }
  scroll = (): void => {
    let a = window.pageYOffset;
    if (a > 33) {
      this.expanded = false;
    } else if (a < 33) {
      this.expanded = true;
    }


  }
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    // setTimeout(() => {
    //   this.expanded = false;
    // }, 7000);


    this.loadcard = ['a', 'a', 'aa', 'a', 'a'];

    this.requests = [];
    this.batchrequests = [];
    this.fillingrequests = [];
    this.RMrequests = [];
    this.loadrequests();
    this.departments = [];
    this.sitemenu = [];
    this.projectmenu = [];
    this.Tile = true;
    this.my_req = [];
    this.fav_req = [];
    this.sitemenuload();
    this.projectloadanddept();
    this.typemenu = ['GxP LAB', 'GxP OTHERS', 'GxP PILOT', 'Not GxP OTHERS', 'Not GxP PILOT', 'Not GxP LAB'];
    this.statusmenu = ['Cancelled', 'Complete', 'Confirmed', 'Filled', 'New', 'Reserved', 'Submitted', 'Weighed'];
    this.legalproductcategory = ['COSMETIC', 'DRUG'];
    this.partnermenu = [];
    this.filteritems = [];
    this.manudatemenu = ['Today', 'Yesterday', 'Tomorrow', 'After_1_month', 'After_2_months', 'Next_30_days', 'Next_7_days'];
    this.getusers();

  }



  getusers() {
    console.log(this.partnermenu);

    this.authService.getusers('USER').subscribe(data => {

      data.data.map(e => {
        this.partnermenu.push({ name: e.user_id });

      });

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
        this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = null;
        this.prefrences.request_filter.filters.manufacturing_date.date_range.to_date = null;
        break;
      default:

    }

    // this.prefrences.request_filter.filters.batch_type = [];
  }


  getprefrences() {
    this.authService.getprefrences().subscribe(data => {
      if (data.success) {
        if (data.data !== undefined) {
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

  formulareq(req) {
    this.authService.req = req;
    this.authService.permission = true;
    this.router.navigate(['/rm']);
  }
  fillingreq(req) {
    this.authService.req = req;
    this.authService.permission = true;
    this.router.navigate(['/filling']);
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

      if (this.requests[0] === undefined) {
        this.expanded = false;
      };
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
        } else if (this.requests[l].status === "Complete") {
          this.requests[l].percent = 99;
        }
        else if (this.requests[l].status === "Pending") {
          this.requests[l].percent = 80;
        };

      }
      this.authService.getfav().subscribe(data => {
        if (data.data) {
          this.fav_req = data.data;


          for (let k = 0; k <= this.requests.length - 1; k++) {
            for (let j = 0; j <= this.fav_req.length - 1; j++) {
              this.fav_req[j].favorites = true;
              if (this.requests[k].request_id === this.fav_req[j].request_id) {
                this.requests[k].favorites = true;
              }
            }
          };
        }

      });

      this.requests.map(data => {
        if (data.createdBy === this.authService.user_id) {
          this.my_req.push(data);
        }
      });



      // for (let i = 0; i <= this.requests.length - 1; i++) {
      //   if (this.requests[i].createdBy === this.authService.user_id) {
      //     this.my_req.push(this.requests[i]);
      //   }
      // };
      this.requests.map(data => {
        if (data.request_type === 'BATCH REQUEST') {
          this.batchrequests.push(data);
        } else if (data.request_type === 'FILLING REQUEST') {
          this.fillingrequests.push(data);
        }
        else if (data.request_type === 'BATCH RM ORDER') {
          this.RMrequests.push(data);
        }
        else {
          this.RMrequests.push(data);
        }
      });


      // for (let i = 0; i <= this.requests.length - 1; i++) {
      //   if (this.requests[i].request_type === 'BATCH REQUEST') {
      //     this.batchrequests.push(this.requests[i]);
      //   } else if (this.requests[i].request_type === 'FILLING REQUEST') {
      //     this.fillingrequests.push(this.requests[i]);
      //   }
      //   else if (this.requests[i].request_type === 'BATCH RM ORDER') {
      //     this.RMrequests.push(this.requests[i]);
      //   }
      //   else {
      //     this.RMrequests.push(data.data[i]);
      //   }
      // };
      this.loader = false;
    });
  }




  filters() {
    let data = this.prefrences.request_filter.filters;
    this.loader = true;

    this.authService.filterssubmit(data).subscribe(data => {
      if (data.success) {

        this.loader = false;
        this.requests = [];
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
          };
          for (let k = 0; k <= this.requests.length - 1; k++) {
            for (let j = 0; j <= this.fav_req.length - 1; j++) {
              this.fav_req[j].favorites = true;
              if (this.requests[k].request_id === this.fav_req[j].request_id) {
                this.requests[k].favorites = true;
              }
            }
          };
        });

        for (let i = 0; i <= this.requests.length - 1; i++) {
          if (this.requests[i].createdBy === this.authService.user_id) {
            this.my_req.push(this.requests[i]);
          }
        }
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
          else {
            this.RMrequests.push(data.data[i]);
          }
        };
      }
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




  appendtofilteritems(value, type) {
    console.log(value.substring(0, 3));

    switch (type) {
      case "type":
        if (value.substring(0, 3) === 'GxP') {
          this.prefrences.request_filter.filters.gxp = true;
          if (this.prefrences.request_filter.filters.batch_type.indexOf(value.substring(4, 10)) === -1) {
            this.prefrences.request_filter.filters.batch_type.push(value.substring(4, 10));
          };
        } else {
          this.prefrences.request_filter.filters.gxp = false;
          if (this.prefrences.request_filter.filters.batch_type.indexOf(value.substring(8, 15)) === -1) {
            this.prefrences.request_filter.filters.batch_type.push(value.substring(8, 15));
          };
        };


        break;
      case "site":
        if (this.prefrences.request_filter.filters.site.indexOf(value) === -1) {
          this.prefrences.request_filter.filters.site.push(value);
        }
        break;
      case "leagalproduct":
        if (this.prefrences.request_filter.filters.legal_product_category.indexOf(value) === -1) {
          this.prefrences.request_filter.filters.legal_product_category.push(value);
        }
        break;
      case "status":
        if (this.prefrences.request_filter.filters.status.indexOf(value) === -1) {
          this.prefrences.request_filter.filters.status.push(value);
        }
        break;
      case "project":
        if (this.prefrences.request_filter.filters.project.indexOf(value) === -1) {
          this.prefrences.request_filter.filters.project.push(value);
        }
        break;
      case "partner":
        if (this.prefrences.request_filter.filters.partner.indexOf(value) === -1) {
          this.prefrences.request_filter.filters.partner.push(value);
        }
        break;
      case "mfgdate":
        console.log(this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date);
        let today = new Date();




        switch (value) {
          case "Today":
            let y = today.getFullYear();
            let m = today.getMonth() + 1;
            let day = today.getDate();

            this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = y + '-' + m + '-' + day;
            this.prefrences.request_filter.filters.manufacturing_date.date_range.to_date = y + '-' + m + '-' + day;
            break;
          case "Yesterday":
            let Yesterday = new Date(today);
            Yesterday.setDate(today.getDate() - 1);
            y = Yesterday.getFullYear();
            m = Yesterday.getMonth() + 1;
            day = Yesterday.getDate();
            this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = y + '-' + m + '-' + day;
            this.prefrences.request_filter.filters.manufacturing_date.date_range.to_date = y + '-' + m + '-' + day;
            break;
          case "Tomorrow":
            let tomo = new Date(today);
            tomo.setDate(today.getDate() + 1);
            y = tomo.getFullYear();
            m = tomo.getMonth() + 1;
            day = tomo.getDate();
            this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = y + '-' + m + '-' + day;
            this.prefrences.request_filter.filters.manufacturing_date.date_range.to_date = y + '-' + m + '-' + day;
            break;
          case "After_1_month":
            let After_1_month = new Date(today);
            After_1_month.setDate(today.getDate() + 30);
            y = After_1_month.getFullYear();
            m = After_1_month.getMonth() + 1;
            day = After_1_month.getDate();
            this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = y + '-' + m + '-' + day;
            // this.prefrences.request_filter.filter.manufacturing_date.to_date = y + '-' + m + '-' + day;
            break;
          case "After_2_months":
            let After_2_months = new Date(today);
            After_2_months.setDate(today.getDate() + 60);
            y = After_2_months.getFullYear();
            m = After_2_months.getMonth() + 1;
            day = After_2_months.getDate();
            this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = y + '-' + m + '-' + day;
            // this.prefrences.request_filter.filter.manufacturing_date.to_date = y + '-' + m + '-' + day;
            break;
          case "Next_30_days":
            let Next_30_days = new Date(today);
            let y1 = today.getFullYear();
            let m1 = today.getMonth() + 1;
            let day1 = today.getDate();

            Next_30_days.setDate(today.getDate() + 30);
            y = Next_30_days.getFullYear();
            m = Next_30_days.getMonth() + 1;
            day = Next_30_days.getDate();
            // day = day + 1;
            // m = d.getDate()+30;
            this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = y1 + '-' + m1 + '-' + day1;
            this.prefrences.request_filter.filters.manufacturing_date.date_range.to_date = y + '-' + m + '-' + day;
            break;
          case "Next_7_days":
            let Next_7_days = new Date(today);
            y1 = today.getFullYear();
            m1 = today.getMonth() + 1;
            day1 = today.getDate();

            Next_7_days.setDate(today.getDate() + 7);
            y = Next_7_days.getFullYear();
            m = Next_7_days.getMonth() + 1;
            day = Next_7_days.getDate();
            this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = y1 + '-' + m1 + '-' + day1;
            this.prefrences.request_filter.filters.manufacturing_date.date_range.to_date = y + '-' + m + '-' + day;

            break;
          default:
        }

        // if (value === 'Today') {

        //   this.prefrences.request_filter.filters.manufacturing_date.from_date = y + '-' + m + '-' + d;
        //   this.prefrences.request_filter.filters.manufacturing_date.to_date = y + '-' + m + '-' + d;
        // } else
        //   if (value === 'Yesterday') {
        //     this.prefrences.request_filter.filters.manufacturing_date.from_date = y + '-' + m + '-' + d;
        //     this.prefrences.request_filter.filters.manufacturing_date.to_date = y + '-' + m + '-' + d;
        //   } else
        //     if (value === 'Tomorrow') {
        //       this.prefrences.request_filter.filters.manufacturing_date.from_date = y + '-' + m + '-' + d;
        //       this.prefrences.request_filter.filters.manufacturing_date.to_date = y + '-' + m + '-' + d;
        //     } else
        //       if (value === 'After_1_month') {
        //         this.prefrences.request_filter.filters.manufacturing_date.from_date = y + '-' + m + '-' + d;
        //         this.prefrences.request_filter.filters.manufacturing_date.to_date = y + '-' + m + '-' + d;
        //       } else
        //         if (value === 'After_2_months') {
        //           this.prefrences.request_filter.filters.manufacturing_date.from_date = y + '-' + m + '-' + d;
        //           this.prefrences.request_filter.filter.manufacturing_date.to_date = y + '-' + m + '-' + d;
        //         } else
        //           if (value === 'Next_30_days') {
        //             this.prefrences.request_filter.filter.manufacturing_date.from_date = y + '-' + m + '-' + d;
        //             this.prefrences.request_filter.filter.manufacturing_date.to_date = y + '-' + m + '-' + d;
        //           } else if (value === 'Next_7_days') {
        //             this.prefrences.request_filter.filter.manufacturing_date.from_date = y + '-' + m + '-' + d;
        //             this.prefrences.request_filter.filter.manufacturing_date.to_date = y + '-' + m + '-' + d;

        //           }
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
  fun(group) {
    console.log(group.value);

  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DateRange1, {
      width: '280px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.prefrences.request_filter.filters.manufacturing_date.date_range.from_date = result.from;
      this.prefrences.request_filter.filters.manufacturing_date.date_range.to_date = result.to;
      console.log(this.prefrences.request_filter.filters.manufacturing_date);

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