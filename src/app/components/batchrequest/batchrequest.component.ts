import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';



@Component({
  selector: 'app-batchrequest',
  templateUrl: './batchrequest.component.html',
  styleUrls: ['./batchrequest.component.css']
})
export class BatchrequestComponent implements OnInit {


  formulator: String = this.authService.user_id;
  startDate: Date = new Date;
  submitter: String = this.authService.user_id;
  newColor = false;
  newColor1 = false;
  newColor2 = false;
  newColor3 = false;
  newColor4 = false;
  newColor5 = true;
  newColor6 = false;
  newColor7 = false;
  filling = true;
  plan = false;
  partner = false;
  bulk = false;
  condition = false;
  destruct = false;
  storage = false;
  material = false;
  approver1 = false;
  fattribute = true;
  sitemenu: String[];
  br_num: String;
  updateddate: String;
  month: number;
  day: number;
  year: number;
  percent: number = 15;
  legalproductcatagory: String;
  batchtype: String;
  reasons: String[];
  reasonsdata: any;
  sitetype: String;
  project: String;
  department: String;
  reason = new FormControl();
  gxpvalue: boolean = true;
  departments: String[];
  projects: String[];
  equipments: String[];
  equipmentdata: any;
  optionalequip: any;
  date: any;
  approvers: String[];
  formula_id: String;

  batch_unit: String = "KG";
  pr_number: String;
  description: String;
  labnotebook: String;
  filling_type: String;
  remaining_bulk: String;
  batch_num: any;
  duedate: String;
  sitefilling: String;
  packagingtype: any;
  users: any;
  benches: any;
  bench: String;
  benchdata: any;
  appr: String;
  newcommnet: String;
  progressbar_color: String = '#09e3f5';
  status: String = 'New';
  status_des: String = 'Batch Request Created';
  reasonpilot: String;
  equipment1: String;
  optional_equipment: String;
  notapplicable: boolean = true;
  saveload: boolean = false;
  comment_list_team: any;
  comment_list_tech: any;
  exisitingreqdata: any;
  isapprover: boolean = false;
  showoverview: boolean = false;
  editvalue: String;
  equipmentsubmitenable: boolean = true;
  labnotebooknums: String[];
  formulaids: String[];
  batch_size: number;

  columnDefs = [
    { headerName: 'Request Number', field: 'request_id' },

    { headerName: 'Submitter', field: 'createdBy' },
    { headerName: 'Created Date', field: 'createdAt' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Comment', field: 'comment' },
  ];

  rowData = [
  ];

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


  constructor(public authService: AuthService,
    public snackBar: MatSnackBar,
    public snotify: SnotifyService,
    public router: Router) {
    if (this.authService.project === undefined && !this.authService.permission) {
      this.router.navigate(['/home']);
    }
  }


  sumitenable() {
    if (this.appr != 'None') {
      this.equipmentsubmitenable = false;
      console.log(this.equipmentsubmitenable);
    }
  }

  ngOnInit() {


    if (this.authService.project != undefined) {
      this.newrequest();
    }

    this.getlabnums();
    this.formulaids = [];
    this.comment_list_tech = [];
    this.comment_list_team = [];
    this.project = this.authService.project;
    this.department = this.authService.department;
    this.reasons = [];
    this.approvers = [];
    this.departments = JSON.parse(localStorage.getItem('departments'));
    this.projects = JSON.parse(localStorage.getItem('projects'));
    this.sitemenu = [];
    this.sitemenuload();
    this.loadreasons();
    this.getequipments();
    this.getpackages();
    this.benches = [];
    this.getbenches();
    this.getusers();
    if (this.authService.permission) {

      this.loadreq();
    }

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


  updatecomment(id) {
    let data = {
      comment_id: id,
      comment: this.editvalue
    }
    this.authService.updatecomment(data).subscribe(data => {
      this.getcomments();
    });
  }

  addcomment(type) {
    let data = {
      request_id: this.br_num,
      comment: this.newcommnet,
      comment_type: type
    }
    this.authService.addcomment(data).subscribe(data => {
      this.getcomments();
      console.log("success comments");
    });
  }

  gethistory() {
    this.authService.gethistrory(this.br_num).subscribe(data => {
      this.rowData = data.data;
    });
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

    };


  }



  loadreq() {
    console.log(this.authService.req);

    this.br_num = this.authService.req.request_id;
    this.getcomments();
    this.gethistory();
    this.submitter = this.authService.req.createdBy;
    this.department = this.authService.req.department;
    this.project = this.authService.req.project;
    this.status = this.authService.req.status;
    this.status_des = this.authService.req.status_description;
    this.sitetype = this.authService.req.site;
    if (this.authService.req.legal_product_category === 'DRUG') {
      // this.toggleColor3();
      this.legalproductcatagory = 'DRUG';
    } else {
      // this.toggleColor4();
      this.legalproductcatagory = 'COSMETIC';
    };

    switch (this.authService.req.batch_size) {
      case "LAB":
        this.batchtype = "LAB";

        break;
      case "PILOT":
        this.batchtype = "PILOT";
        break;
      case "OTHERS":
        this.batchtype = "OTHERS";
        break;
      default:

    }
    this.gxpvalue = this.authService.req.gxp;

    document.getElementById("overview").className = "tab-pane active";
    document.getElementById("equipment").className = "tab-pane fade";
    document.getElementById("ovrviw").className = "nav-link active";
    document.getElementById("eqpment").className = "nav-link";

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
    }



    this.updateddate = this.authService.req.lastModified.substring(0, 10);
    this.showoverview = true;
    // switch (this.authService.req.legal_product_category) {
    //   case "DRUG":
    //     this.toggleColor3();
    //     break;
    //   case "COSMETIC":
    //     this.toggleColor4();
    //     break;
    //   default:
    //     this.toggleColor4();
    // }

    this.authService.getspecificreq(this.br_num).subscribe(data => {
      console.log(data);
      if (data.data.equipmentRequest === undefined) {
        this.snotify.simple('User has not added any req', 'Not Submitted', {
          timeout: 5000,
          position: SnotifyPosition.centerCenter,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
      };
      if (data.data.equipmentRequest != undefined) {
        let approver = data.data.equipmentRequest.approver;
        this.appr = approver;
        this.date = data.data.equipmentRequest.manufacturing_date.substring(0, 10);
        if (approver === this.authService.user_id) {
          this.isapprover = true;
        }
        this.exisitingreqdata = data.data;
        if (data.data.equipmentRequest.equipment === undefined) {
          this.equipment1 = "No Equipment added";
        } else {
          this.equipment1 = data.data.equipmentRequest.equipment;
        };
      };
    });
  }


  delcomment(id) {
    console.log('delete');
    this.authService.delcomment(id).subscribe(data => {
      this.snackBar.open('Deleted Success', 'ok', { duration: 3000 });
      this.getcomments();
    });

  }



  getcomments() {
    this.authService.getcomments(this.br_num).subscribe(data => {

      this.comment_list_team = data.data.team_communication.comments;
      this.comment_list_tech = data.data.technical_communication.comments;


      this.comment_list_team.map(e => {
        this.comment_list_team.edit = false;
      });
      this.comment_list_tech.map(e => {
        this.comment_list_tech.edit = false;
      });

    });

  }



  getusers() {
    this.authService.getusers("USER").subscribe(data => {
      if (data.success) {
        if (data.data.length) {
          const results = data.data;

          results.map(e => {
            if (e.approver_permission) {
              this.approvers.push(e.user_id);
            }
            return;
          });
        }
      }

    });

    // this.authService.getusers("ADMIN").subscribe(data => {
    //   if (data.success) {
    //     if (data.data.length) {
    //       const results = data.data;

    //       results.map(e => {
    //         this.approvers.push(e.user_id);
    //         return;
    //       });



    //     }

    //   }
    // });

  }

  newrequest() {
    console.log('test');
    let request_type = "BATCH REQUEST"
    this.authService.submitnewreq(request_type).subscribe(data => {
      this.br_num = data.data.request_id;
      this.year = data.data.lastModified.slice(0, 4);
      this.month = data.data.lastModified.slice(5, 7);
      this.day = data.data.lastModified.slice(8, 10);
      this.updateddate = this.year + '/' + this.month + '/' + this.day;
    });

  }

  sitemenuload() {
    this.sitemenu = JSON.parse(localStorage.getItem('sites'));
  }


  toggleColor() {
    if (this.newColor = true) {
      this.newColor = true;
    }
    else {
      this.newColor = !this.newColor;
    }
    this.newColor1 = false;
    this.newColor2 = false;
    this.batchtype = 'LAB';
    this.addreasons();
  }
  toggleColor1() {

    if (this.newColor1 = true) {
      this.newColor1 = true;
    }
    else {
      this.newColor1 = !this.newColor1;
    }
    this.newColor = false;
    this.newColor2 = false;
    this.batchtype = 'PILOT';
    this.addequipmentstolist();
    this.addreasons();

  }
  toggleColor2() {
    if (this.newColor2 = true) {
      this.newColor2 = true;
    }
    else {
      this.newColor2 = !this.newColor2;
    }
    this.newColor = false;
    this.newColor1 = false;
    this.batchtype = 'OTHERS';
    this.addreasons();
    this.addequipmentstolist();
  }

  toggleColor3() {

    if (this.newColor3 = true) {
      this.newColor3 = true;
    }
    else {
      this.newColor3 = !this.newColor3;
    }
    this.newColor4 = false;
    this.legalproductcatagory = 'DRUG';
    this.bencheselect();
  }
  toggleColor4() {

    if (this.newColor4 = true) {
      this.newColor4 = true;
    }
    else {
      this.newColor4 = !this.newColor4;
    }
    this.newColor3 = false;
    this.legalproductcatagory = 'COSMETIC'
    this.bencheselect();
  }
  toggleColor5() {

    if (this.newColor5 = true) {
      this.newColor5 = true;
    }
    else {
      this.newColor5 = !this.newColor5;
    }
    this.newColor6 = false;
    this.newColor7 = false;
  }
  toggleColor6() {

    if (this.newColor6 = true) {
      this.newColor6 = true;
    }
    else {
      this.newColor6 = !this.newColor6;
    }
    this.newColor5 = false;
    this.newColor7 = false;
  }
  toggleColor7() {

    if (this.newColor7 = true) {
      this.newColor7 = true;
    }
    else {
      this.newColor7 = !this.newColor7;
    }
    this.newColor6 = false;
    this.newColor5 = false;
  }
  filling1() {

    if (this.filling = true) {
      this.filling = true;
    }
    else {
      this.filling = !this.filling;
    }
    this.plan = false;
    this.partner = false;
  }
  plan1() {

    if (this.plan = true) {
      this.plan = true;
    }
    else {
      this.plan = !this.plan;
    }
    this.filling = false;
    this.partner = false;
  }
  partner1() {
    if (this.partner = true) {
      this.partner = true;
    }
    else {
      this.partner = !this.partner;
    }
    this.filling = false;
    this.plan = false;
  }
  bulk1() {


    if (this.bulk = true) {
      this.bulk = true;
    }
    else {
      this.bulk = !this.bulk;
    }
    this.condition = false;
    this.filling_type = "BULK FILLING";
  }
  condition1() {

    if (this.condition = true) {
      this.condition = true;
    }
    else {
      this.condition = !this.condition;
    }
    this.bulk = false;
    this.filling_type = "RE-CONDITIONING";
  }
  destruct1() {

    if (this.destruct = true) {
      this.destruct = true;
    }
    else {
      this.destruct = !this.destruct;
    }
    this.storage = false;
    this.remaining_bulk = "DESTRUCTION";
  }
  storage1() {

    if (this.storage = true) {
      this.storage = true;
    }
    else {
      this.storage = !this.storage;
    }
    this.destruct = false;
    this.remaining_bulk = "STORAGE";
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

  bencheselect() {
    for (let i = 0; i <= this.benchdata.length - 1; i++) {
      if (this.sitetype === this.benchdata[i].site && this.legalproductcatagory === this.benchdata[i].legal_product_category) {
        this.benches = this.benchdata[i].bench;
        // console.log(this.benches);

      }
    }
  }
  getbenches() {
    this.authService.getbenches().subscribe(data => {
      this.benchdata = data.data;


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
  getpackages() {
    this.authService.getpc().subscribe(data => {
      this.packagingtype = data.data;
      // console.log(data);

    });
  }

  formatduedate(date: Date) {
    console.log(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.duedate = year + '-' + month + '-' + day;
    console.log(this.duedate);

  }



  addreasons() {

    for (let i = 0; i <= this.reasonsdata.length - 1; i++) {
      if (this.sitetype === this.reasonsdata[i].site && this.batchtype === this.reasonsdata[i].batch_type) {
        if (this.reasonsdata[0] === undefined) {
          this.reasons = ["NO Reasons For "]
        }
        this.reasons = this.reasonsdata[i].reason;
        console.log(this.reasons);

      }
    }
  }


  loadreasons() {
    this.authService.getreasons().subscribe(data => {

      this.reasonsdata = data.data;

    });
  }



  getequipments() {
    this.authService.getequipments().subscribe(data => {
      this.equipmentdata = data.data;


    });
  }



  formatdatemfg(date: Date) {
    console.log(date);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.date = year + '-' + month + '-' + day;
    console.log(this.date);

  }



  addequipmentstolist() {
    console.log(this.equipmentdata[2].site, this.sitetype);
    for (let i = 0; i <= this.equipmentdata.length - 1; i++) {
      if (this.sitetype === this.equipmentdata[i].site && this.batchtype === this.equipmentdata[i].batch_type) {
        this.equipments = this.equipmentdata[i].equipment_list;
        this.optionalequip = this.equipmentdata.optional_equipment;
      }
    }


  }



  equipmentreq(falg) {
    this.snotify.simple('Please wait', 'Updating', {
      timeout: 5000,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true
    });
    this.saveload = true;
    console.log(this.date);
    console.log(this.bench);
    let reason = this.reason.value;
    if (this.reason.value === undefined) {
      reason = this.reasonpilot;
    }
    let data = {
      request_id: this.br_num,
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      reason_for_this_batch: this.reason.value,
      equipment: this.equipment1,
      optional_equipment: this.optional_equipment,
      gxp: this.gxpvalue,
      bench_id: this.bench,
      request_date: this.date,
      approver: this.appr,
      flag: falg,


    }
    console.log(data);

    this.authService.equipmentrequest(data).subscribe(data => {
      if (data.success) {
        this.saveload = false;
        this.snotify.success(falg + 'ed', 'Success', {
          timeout: 2000,
          position: SnotifyPosition.rightTop,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
      }

    });
    this.saveload = false;
    if (this.authService.equipmentload) {
      this.saveload = false;
    }

  }


  formulareq_save(flag) {
    this.snotify.simple('Please wait', 'Updating', {
      timeout: 5000,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true
    });
    let data = {
      request_id: this.br_num,
      formula_id: this.formula_id,
      batch_size: this.batch_size,
      batch_unit: this.batch_unit,
      lab_note_book_number: this.labnotebook,
      raw_material: [],
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      formula_status: "new",
      formula_description: this.description,
      formula_pr_number: this.pr_number,
      formulator: this.authService.user_id,
      project: this.project,
      department: this.department,
      manufacturing_date: this.date,
      request_type: "BATCH REQUEST",
      flag: flag,
      performed_by: this.authService.user_id,
      approver: this.appr,
      confirm_flag: true
    }
    console.log(data);
    this.authService.savermrequest(data).subscribe(data => {
      this.snotify.success('Success', flag + 'ed', {
        timeout: 2000,
        position: SnotifyPosition.rightTop,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true
      });
    });
  }






  fillingreq_save(flag) {
    this.snotify.simple('Please wait', 'Updating', {
      timeout: 5000,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true
    });
    let data = {
      request_id: this.br_num,
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      lab_notebook_number: this.labnotebook,
      formula_id: this.formula_id,
      formula_status: this.status,
      filling_type: this.filling_type,
      remaining_bulk: this.remaining_bulk,
      gxp: this.gxpvalue,
      batch_number: this.batch_num,
      manufacturing_site: this.sitetype,
      due_date: this.duedate,
      not_applicable_flag: this.notapplicable,
      packaging_type: [],
      formula_description: this.description,
      formulator: this.authService.user_id,
      project: this.project,
      department: this.department,
      manufacturing_date: this.date,
      approver: this.appr,
      // rejection_comment: this.rejection_comment,
      request_type: "BATCH REQUEST",
      flag: flag

    }
    console.log(data);
    this.authService.submitfilling(data).subscribe(data => {
      this.snotify.success('Success', flag + 'ed', {
        timeout: 2000,
        position: SnotifyPosition.rightTop,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true
      });
    });
  }

}