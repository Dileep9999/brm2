import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Http } from '@angular/http';
import "rxjs/add/operator/catch";
import { MatSnackBar } from '@angular/material';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rmrequest',
  templateUrl: './rmrequest.component.html',
  styleUrls: ['./rmrequest.component.css']
})
export class RmrequestComponent implements OnInit {
  startDate: Date = new Date;
  fattribute = true;
  material = false;
  approver1 = false;
  flab = false;
  fpilot = false;
  GxP = false;
  legal_product_category: String;
  sitetype: String;
  department: String;
  drug = false;
  cosmetic = false;
  project: String;
  fr_num: String;
  updateddate: String;
  month: number;
  day: number;
  year: number;
  percent: number = 15;
  sitemenu: String[];
  mfgdate: String;
  projects = JSON.parse(localStorage.getItem('projects'));
  departments = JSON.parse(localStorage.getItem('departments'));
  labnotebook: String;
  description: String;
  formula_id: String;
  batch_size: number = 1;
  batch_unit: String = "KG";
  batch_type: String;
  pr_number: number;
  rm_num: String;
  appr: String;
  approvers: String[];
  isapprover: boolean = false;
  progressbar_color: String = '#09e3f5';
  row_matrials: any = [{
    trade_name: 'Structural XL',
    rm_num: 'RMT0138',
    percentage: 1.0,
    quantity_required: (this.batch_size * 1) / 100,
    simatic_lab_gxp_stock: '-',
    simatic_pilot_stock: 0.2,
    simatic_lab_stock: 0.5,
    quantity_to_order: ((this.batch_size * 1) / 100) * 2
  }, {
    trade_name: 'Sepiplus 400',
    rm_num: 'RMT0138',
    percentage: 1.0,
    quantity_required: (this.batch_size * 1) / 100,
    simatic_lab_gxp_stock: '-',
    simatic_pilot_stock: 'In-House',
    simatic_lab_stock: 'In-House',
    quantity_to_order: ((this.batch_size * 1) / 100) * 2
  }, {
    trade_name: 'Phenoxptol',
    rm_num: 'RMT0138',
    percentage: 2.0,
    quantity_required: (this.batch_size * 1) / 100,
    simatic_lab_gxp_stock: '-',
    simatic_pilot_stock: 'In-House',
    simatic_lab_stock: 'In-House',
    quantity_to_order: ((this.batch_size * 1) / 100) * 2
  }];
  labnotebooknums: String[];
  formulaids: String[];
  status: String = "New";
  status_des: String = "Filling Request Created";
  exisitingreqdata: any;
  comment_list_team: any;
  comment_list_tech: any;
  columnDefs = [
    { headerName: 'Request Number', field: 'request_id' },

    { headerName: 'Submitter', field: 'createdBy' },
    { headerName: 'Created Date', field: 'createdAt' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Comment', field: 'comment' },
  ];

  rowData = [
  ];
  newcommnet: String;
  editvalue: String;
  rejection_comment: String;
  rejectshow: boolean = false;

  constructor(
    public authService: AuthService,
    public http: Http,
    public router: Router,
    public snotify: SnotifyService,
    public snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    this.approvers = [];
    this.labnotebooknums = [];
    this.formulaids = [];
    this.project = this.authService.project;
    this.department = this.authService.department;
    if (this.authService.project === undefined && !this.authService.permission) {
      this.router.navigate(['/home']);
    }
    if (this.authService.project === undefined) {
      this.loadreq();

    } else {
      this.newrequest();
    }
    this.sitemenu = JSON.parse(localStorage.getItem('sites'));
    this.getusers();
    this.getlabnums();
  }

  getrowmatrials() {

  }

  updaterowmatrials() {
    switch (this.batch_unit) {
      case 'KG':

        this.row_matrials.quantity_required = ((this.batch_size * 1) / 100) * 1000;
        this.row_matrials.quantity_to_order = (((this.batch_size * 1) / 100) * 2) * 1000;
        break;
      case 'G':
        this.row_matrials.quantity_required = ((this.batch_size * 1) / 100);
        this.row_matrials.quantity_to_order = (((this.batch_size * 1) / 100) * 2);
        break;
      case 'OZ':
        this.row_matrials.quantity_required = ((this.batch_size * 1) / 100) * 28.3495;
        this.row_matrials.quantity_to_order = (((this.batch_size * 1) / 100) * 2) * 28.3495;
        break;
      default:

    }

    switch (this.batch_unit) {
      case 'KG':
        this.row_matrials = [{
          trade_name: 'Structural XL',
          rm_num: 'RMT0138',
          percentage: 1.0,
          quantity_required: ((this.batch_size * 1) / 100) * 1000,
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 0.2,
          simatic_lab_stock: 0.5,
          quantity_to_order: (((this.batch_size * 1) / 100) * 2) * 1000
        }, {
          trade_name: 'Sepiplus 400',
          rm_num: 'RMT0138',
          percentage: 1.0,
          quantity_required: ((this.batch_size * 1) / 100) * 1000,
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 'In-House',
          simatic_lab_stock: 'In-House',
          quantity_to_order: (((this.batch_size * 1) / 100) * 2) * 1000
        }, {
          trade_name: 'Phenoxptol',
          rm_num: 'RMT0138',
          percentage: 2.0,
          quantity_required: (((this.batch_size * 1) / 100)) * 1000,
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 'In-House',
          simatic_lab_stock: 'In-House',
          quantity_to_order: (((this.batch_size * 1) / 100) * 2) * 1000
        }];

        break;
      case 'G':
        this.row_matrials = [{
          trade_name: 'Structural XL',
          rm_num: 'RMT0138',
          percentage: 1.0,
          quantity_required: ((this.batch_size * 1) / 100),
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 0.2,
          simatic_lab_stock: 0.5,
          quantity_to_order: (((this.batch_size * 1) / 100) * 2)
        }, {
          trade_name: 'Sepiplus 400',
          rm_num: 'RMT0138',
          percentage: 1.0,
          quantity_required: ((this.batch_size * 1) / 100),
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 'In-House',
          simatic_lab_stock: 'In-House',
          quantity_to_order: (((this.batch_size * 1) / 100) * 2)
        }, {
          trade_name: 'Phenoxptol',
          rm_num: 'RMT0138',
          percentage: 2.0,
          quantity_required: (((this.batch_size * 1) / 100)),
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 'In-House',
          simatic_lab_stock: 'In-House',
          quantity_to_order: (((this.batch_size * 1) / 100) * 2)
        }];

        break;
      case 'OZ':
        this.row_matrials = [{
          trade_name: 'Structural XL',
          rm_num: 'RMT0138',
          percentage: 1.0,
          quantity_required: ((this.batch_size * 1) / 100) * 28.3495,
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 0.2,
          simatic_lab_stock: 0.5,
          quantity_to_order: (((this.batch_size * 1) / 100) * 2) * 28.3495
        }, {
          trade_name: 'Sepiplus 400',
          rm_num: 'RMT0138',
          percentage: 1.0,
          quantity_required: ((this.batch_size * 1) / 100) * 28.3495,
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 'In-House',
          simatic_lab_stock: 'In-House',
          quantity_to_order: (((this.batch_size * 1) / 100) * 2) * 28.3495
        }, {
          trade_name: 'Phenoxptol',
          rm_num: 'RMT0138',
          percentage: 2.0,
          quantity_required: (((this.batch_size * 1) / 100)) * 28.3495,
          simatic_lab_gxp_stock: '-',
          simatic_pilot_stock: 'In-House',
          simatic_lab_stock: 'In-House',
          quantity_to_order: (((this.batch_size * 1) / 100) * 2) * 28.3495
        }];
        break;
      default:

    }


  }

  loadreq() {
    console.log(this.authService.req);


    this.fr_num = this.authService.req.request_id;
    this.getcomments();
    this.gethistory();



    this.department = this.authService.req.department;
    this.project = this.authService.req.project;
    console.log(this.department, this.project);
    this.status = this.authService.req.status;
    this.status_des = this.authService.req.status_description;
    this.sitetype = this.authService.req.site;

    this.authService.permission = false;
    switch (this.authService.req.status) {
      case "New":
        this.percent = 17;
        break;
      case "Submitted":
        this.percent = 34;
        this.progressbar_color = '#055cfc';
        break;
      case "Cancelled":
        this.percent = 100;
        this.progressbar_color = '#f50910';
        break;
      case "Rejected":
        this.percent = 100;
        this.progressbar_color = '#f50910';
        break;
      case "Reserved":
        this.percent = 65;
        this.progressbar_color = '#00c00f';
        break;
      case "Confirmed":
        this.percent = 85;
        this.progressbar_color = '#00c00f';
        break;
      default:
        this.percent = 0;
        this.progressbar_color = '#f50910';
    };
    if (this.authService.req.legal_product_category === 'DRUG') {
      this.drug1();

    } else {
      this.cosmetic1();
    };






    this.authService.getspecificreq(this.fr_num).subscribe(data => {
      console.log(data);
      this.authService.permission = false;


      let approver = data.data.fillingRequest.approver;
      this.appr = approver;

      this.mfgdate = data.data.fillingRequest.manufacturing_date;
      console.log(this.mfgdate);

      if (approver === this.authService.user_id) {
        this.isapprover = true;
      }

      this.exisitingreqdata = data.data;



    });


  }




  getlabnums() {
    this.authService.getlabs().subscribe(data => {
      this.labnotebooknums = data.data;
    });
  }



  getformulas() {
    this.authService.getformulas(this.labnotebook).subscribe(data => {
      this.formulaids = data.data;
    });
  }



  getusers() {
    this.authService.getusers("USER").subscribe(data => {
      if (data.success) {
        console.log(data);
        data.data.map(e => {
          if (e.approver_permission) {
            this.approvers.push(e.user_id)
          }
        })

        // for (let i = 0; i <= data.data.length; i++) {
        //   if (data.data[i].approver_permission) {
        //     this.approvers.push(data.data[i].user_id)
        //   }
        // }
        console.log(this.approvers);
      }
    });

    // this.authService.getusers("ADMIN").subscribe(data => {

    // });
    // this.authService.getusers("SUPERADMIN").subscribe(data => {

    // });
  }


  newrequest() {
    this.authService.submitnewreq("BATCH RM ORDER").subscribe(data => {
      console.log(data);

      this.rm_num = data.data.request_id;
      this.year = data.data.lastModified.slice(0, 4);
      this.month = data.data.lastModified.slice(5, 7);
      this.day = data.data.lastModified.slice(8, 10);
      this.updateddate = this.year + '/' + this.month + '/' + this.day;
    });
  }



  getcomments() {
    this.authService.getcomments(this.fr_num).subscribe(data => {

      this.comment_list_team = data.data.team_communication.comments;
      this.comment_list_tech = data.data.technical_communication.comments;
      console.log(this.comment_list_team);

      this.comment_list_team.map(e => {
        this.comment_list_team.edit = false;
      });
      this.comment_list_tech.map(e => {
        this.comment_list_tech.edit = false;
      });

    });

  }

  gethistory() {
    this.authService.gethistrory(this.fr_num).subscribe(data => {
      this.rowData = data.data;
    });
  }
  delcomment(id) {
    console.log('delete');

    this.authService.delcomment(id).subscribe(data => {
      this.snackBar.open('Deleted Success', 'ok', { duration: 3000 });
      this.getcomments();
    });

  }


  addcomment(type) {
    let data = {
      request_id: this.fr_num,
      comment: this.newcommnet,
      comment_type: type
    }
    this.authService.addcomment(data).subscribe(data => {
      this.getcomments();
      console.log("success comments");
    });
  }



  fattribute1() {
    if (this.fattribute = true) {
      this.fattribute = true;
    }
    else {
      this.fattribute = !this.fattribute;
    }
    this.material = false;
    this.approver1 = false;

  }
  material1() {
    if (this.material = true) {
      this.material = true;
    }
    else {
      this.material = !this.material;
    }
    this.fattribute = false;
    this.approver1 = false;
  }
  approver() {
    if (this.approver1 = true) {
      this.approver1 = true;
    }
    else {
      this.approver1 = !this.approver1;
    }
    this.fattribute = false;
    this.material = false;
  }
  flab1() {
    this.batch_type = "LAB"
    if (this.flab = true) {
      this.flab = true;
    }
    else {
      this.flab = !this.flab;
    }
    this.fpilot = false;
    this.GxP = false;
  }
  fpilot1() {
    this.batch_type = "PILOT"
    if (this.fpilot = true) {
      this.fpilot = true;
    }
    else {
      this.fpilot = !this.fpilot;
    }
    this.flab = false;
    this.GxP = false;
  }
  GxP1() {
    this.batch_type = "GXP BATCH"
    if (this.GxP = true) {
      this.GxP = true;
    }
    else {
      this.GxP = !this.GxP;
    }
    this.flab = false;
    this.fpilot = false;
  }
  drug1() {
    // this.drug=!this.drug;
    if (this.drug = true) {
      this.drug = true;
    }
    else {
      this.drug = !this.drug;
    }
    this.cosmetic = false;
    this.legal_product_category = "DRUG";
  }
  cosmetic1() {
    // this.cosmetic=!this.cosmetic;
    if (this.cosmetic = true) {
      this.cosmetic = true;
    }
    else {
      this.cosmetic = !this.cosmetic;
    }
    this.drug = false;
    this.legal_product_category = "COSMETIC";
  }
  formatdatemfg(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.mfgdate = year + '-' + month + '-' + day;
    console.log(this.mfgdate);

  }


  submit(flag) {
    let data = {
      request_id: this.rm_num,
      formula_id: this.formula_id,
      batch_size: this.batch_size,
      batch_unit: this.batch_unit,
      lab_note_book_number: this.labnotebook,
      raw_material: this.row_matrials,
      site: this.sitetype,
      batch_type: this.batch_type,
      legal_product_category: this.legal_product_category,
      formula_status: "new",
      formula_description: this.description,
      formula_pr_number: this.pr_number,
      formulator: this.authService.user_id,
      project: this.project,
      department: this.department,
      manufacturing_date: this.mfgdate,
      request_type: "BATCH RM ORDER",
      approver: this.appr,
      performed_by: this.authService.user_id,
      flag: flag,
      confirm_flag: true
    }
    console.log(data);
    this.authService.savermrequest(data).subscribe(data => {
      this.snotify.success('Success', flag + 'ed', {
        timeout: 3000,
        position: SnotifyPosition.rightTop,
        pauseOnHover: true,
        closeOnClick: true,
        showProgressBar: false

      });
    });
  }



}
