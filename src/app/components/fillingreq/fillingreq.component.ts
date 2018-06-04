import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Jsonp } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

@Component({
  selector: 'app-fillingreq',
  templateUrl: './fillingreq.component.html',
  styleUrls: ['./fillingreq.component.css']
})
export class FillingreqComponent implements OnInit {
  filling = true;
  startDate: Date = new Date;
  lab = false;
  plan = false;
  partner = false;
  approver = false;
  pilot = false;
  other = false;
  drug = false;
  cosmetic = false;
  destruct = false;
  storage = false;
  bulk = false;
  condition = false;
  fr_num: String;
  updateddate: String;
  month: number;
  day: number;
  year: number;
  percent: number = 15;
  legal_product_category: String;
  filling_type: String;
  remaining_bulk: String;
  batch_type: String;
  project: String;
  department: String;
  user_id = localStorage.getItem('user_id');
  sitemenu: String[];
  sitetype: String;
  mfgdate: String;
  projects = JSON.parse(localStorage.getItem('projects'));
  departments = JSON.parse(localStorage.getItem('departments'));
  labnotebook: String;
  batch_num: String;
  formula_id: String;
  gxpvalue: String;
  duedate: String;
  description: String;
  approvers: any;
  appr: String;
  packagingcode: String;
  packagingcodes: String[];
  notapplicable: boolean = true;
  labnotebooknums: String[];
  formulaids: String[];
  isapprover: boolean = false;
  progressbar_color: String = '#09e3f5';
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


  disable: boolean = true;
  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public router: Router,
    private snotify: SnotifyService
  ) {

  }

  ngOnInit() {
    this.project = this.authService.project;
    this.department = this.authService.department;
    if (this.authService.project === undefined && !this.authService.permission) {
      this.router.navigate(['/home']);
    };
    if (this.authService.permission) {
      this.loadreq();
    } else if (!this.authService.permission && this.authService.project != undefined) {
      this.newrequest();
    };


    this.formulaids = [];
    this.labnotebooknums = [];
    this.packagingcodes = [];
    this.sitemenu = JSON.parse(localStorage.getItem('sites'));
    this.approvers = [];
    this.getusers();
    this.getlabnums();
    this.getpackagingcodes();
  }

  loadreq() {
    console.log(this.authService.req);


    this.fr_num = this.authService.req.request_id;
    this.getcomments();
    this.gethistory();
    this.gxpvalue = this.authService.req.gxp;
    if (this.authService.req.createdBy === this.authService.user_id) {
      this.disable = false;
    };
    if (this.authService.req.filling_approver === this.authService.user_id) {
      this.disable = false;
    }


    this.department = this.authService.req.department;
    this.project = this.authService.req.project;
    console.log(this.department, this.project);
    this.status = this.authService.req.status;
    this.status_des = this.authService.req.status_description;
    this.sitetype = this.authService.req.site;
    if (this.authService.req.batch_type === 'LAB') {
      this.lab1();
    } else if (this.authService.req.batch_type === 'PILOT') {
      this.pilot1();
    } else {
      this.other1();
    };


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


    this.updateddate = this.authService.req.lastModified.substring(0, 10);
    if (this.authService.req.filling_type === 'BULK FILLING') {
      this.bulk1();

    } else {
      this.condition1();
    };

    if (this.authService.req.remaining_bulk === 'DESTRUCTION') {
      this.destruct1();

    } else {
      this.storage1();
    };



    this.authService.getspecificreq(this.fr_num).subscribe(data => {
      console.log(data);
      this.authService.permission = false;

      this.labnotebook = data.data.formulaAttributes.lab_note_book_number;
      this.formula_id = data.data.formulaAttributes.formula_id;
      let approver = data.data.fillingRequest.approver;
      this.appr = approver;
      this.batch_num = data.data.fillingRequest.batch_number;
      this.mfgdate = data.data.fillingRequest.manufacturing_date;
      console.log(this.mfgdate);

      if (approver === this.authService.user_id) {
        this.isapprover = true;
      }
      this.duedate = data.data.fillingRequest.due_date.substring(0, 10);
      this.exisitingreqdata = data.data;
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

  updatecomment(id) {
    let data = {
      comment_id: id,
      comment: this.editvalue
    }
    this.authService.updatecomment(data).subscribe(data => {
      this.getcomments();
    });
  }





  getlabnums() {
    this.authService.getlabs().subscribe(data => {
      this.labnotebooknums = data.data;
    });
  }

  getformulas() {
    this.authService.getformulas(this.labnotebook).subscribe(data => {
      console.log(data);

      this.formulaids = data.data;
    });
  }


  getusers() {
    this.authService.getusers("USER").subscribe(data => {
      if (data.success) {
        console.log(data);
        let e = data.data;
        e.map(e => {
          if
          (e.approver_permission) {
            this.approvers.push(e.user_id)
          }
        });
      }
    });
  }

  getpackagingcodes() {

    this.authService.getpc().subscribe(data => {
      data.data.map(data => {
        this.packagingcodes.push(data.packaging_code);
      });

      // for (let i = 0; i <= data.data.length - 1; i++) {
      //   this.packagingcodes.push(data.data[i].packaging_code);
      // }
    });
  }


  save(flag) {
    this.snotify.simple('Please wait', 'Updating', {
      timeout: 4000,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true
    });


    let data = {
      request_id: this.fr_num,
      site: this.sitetype,
      batch_type: this.batch_type,
      legal_product_category: this.legal_product_category,
      lab_note_book_number: this.labnotebook,
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
      manufacturing_date: this.mfgdate,
      request_type: "FILLING REQUEST",
      approver: this.appr,
      rejection_comment: this.rejection_comment,
      flag: flag

    }
    console.log(data);
    this.authService.savefillingreq(data).subscribe(data => {
      this.snotify.success('Success', flag + 'ed', {
        timeout: 2000,
        position: SnotifyPosition.rightTop,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true
      });
    });

  }


  formatdatemfg(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.mfgdate = year + '-' + month + '-' + day;
    console.log(this.mfgdate);

  }

  formatduedate(date: Date) {
    console.log(date);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.duedate = year + '-' + month + '-' + day;
    console.log(this.duedate);

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
    this.approver = false;
  }
  plan1() {
    //
    if (this.plan = true) {
      this.plan = true;
    }
    else {
      this.plan = !this.plan;
    }
    this.filling = false;
    this.partner = false;
    this.approver = false;
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
    this.approver = false;
  }
  approver1() {

    if (this.approver = true) {
      this.approver = true;
    }
    else {
      this.approver = !this.approver;
    }
    this.filling = false;
    this.partner = false;
    this.plan = false;
  }
  pilot1() {

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

    if (this.lab = true) {
      this.lab = true;
    }
    else {
      this.lab = !this.lab;
    }
    this.pilot = false;
    this.other = false;
    this.batch_type = "LAB";
    this.notapplicable = true;
  }
  drug1() {

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

    if (this.cosmetic = true) {
      this.cosmetic = true;
    }
    else {
      this.cosmetic = !this.cosmetic;
    }
    this.drug = false;
    this.legal_product_category = "COSMETIC";
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






  newrequest() {
    this.disable = false
    this.authService.submitnewreq("FILLING REQUEST").subscribe(data => {
      console.log(data);
      this.fr_num = data.data.request_id;
      this.year = data.data.lastModified.slice(0, 4);
      this.month = data.data.lastModified.slice(5, 7);
      this.day = data.data.lastModified.slice(8, 10);
      this.updateddate = this.year + '/' + this.month + '/' + this.day;
    });
  }

}
