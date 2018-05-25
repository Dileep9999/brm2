import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';



@Component({
  selector: 'app-batchrequest',
  templateUrl: './batchrequest.component.html',
  styleUrls: ['./batchrequest.component.css']
})
export class BatchrequestComponent implements OnInit {


  submitter: String;
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
  batch_size: String;
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

  comment_list_team: any;
  comment_list_tech: any;

  exisitingreqdata: any;

  showoverview: boolean = false;
  editvalue: String;
  equipmentsubmitenable: boolean = true;

  labnotebooknums: String[];
  formulaids: String[];

  constructor(public authService: AuthService,
    public snackBar: MatSnackBar,
    public router: Router) { }


  sumitenable() {
    if (this.appr != 'None') {
      this.equipmentsubmitenable = false;
      console.log(this.equipmentsubmitenable);
    }
  }

  ngOnInit() {
    if (this.authService.project === undefined && !this.authService.permission) {
      this.router.navigate(['/']);

    }
    if (this.authService.project != undefined) {
      this.newrequest();
    }
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

      console.log(this.authService.req);
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
    console.log(data);

    this.authService.addcomment(data).subscribe(data => {
      this.getcomments();
      console.log("success comments");


    });
  }

  loadreq() {
    console.log('test1');
    this.br_num = this.authService.req.request_id;
    this.getcomments();
    this.submitter = this.authService.req.createdBy;
    this.department = this.authService.req.department;
    this.project = this.authService.req.project;
    this.status = this.authService.req.status;
    this.status_des = this.authService.req.status_description;

    if (this.authService.req.status === 'New') {
      this.percent = 17;
    } else if (this.authService.req.status === 'Submitted') {
      this.percent = 34;
      this.progressbar_color = '#055cfc';
    } else if (this.authService.req.status === 'Cancelled') {
      this.percent = 100;
      this.progressbar_color = '#f50910';
    }
    this.updateddate = this.authService.req.lastModified.substring(0, 10);
    this.showoverview = true;
    this.authService.getspecificreq().subscribe(data => {
      console.log('test loadreq');
      console.log(data);


      this.exisitingreqdata = data.data;
      this.date = this.exisitingreqdata.equipmentRequest.manufacturing_date;
      console.log(this.br_num);

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
      for (let i = 0; i <= this.comment_list_team.length - 1; i++) {
        this.comment_list_team[i].edit = false;
      }
      for (let i = 0; i <= this.comment_list_tech.length - 1; i++) {
        this.comment_list_tech[i].edit = false;
      }
    });

  }



  getusers() {
    this.authService.getusers("USER").subscribe(data => {
      if (data.success) {


        for (let i = 0; i <= data.data.length; i++) {
          if (data.data[i].approver_permission == true) {
            this.approvers.push(data.data[i].user_id);
          }
        }



      }

    });

    // this.authService.getusers("ADMIN").subscribe(data => {

    // });
    // this.authService.getusers("SUPERADMIN").subscribe(data => {

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


  toggleColor(sitevalue) {
    if (this.newColor = true) {
      this.newColor = true;
    }
    else {
      this.newColor = !this.newColor;
    }
    this.newColor1 = false;
    this.newColor2 = false;
    this.batchtype = 'LAB';
    this.addreasons(sitevalue, this.batchtype);
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
    this.addreasons(this.sitetype, this.batchtype);

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
    this.addreasons(this.sitetype, this.batchtype);
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

  bencheselect() {
    for (let i = 0; i <= this.benchdata.length - 1; i++) {
      if (this.sitetype === this.benchdata[i].site && this.legalproductcatagory === this.benchdata[i].legal_product_category) {
        this.benches = this.benchdata[i].bench;
        // console.log(this.benches);

      }
    }
  }
  getbenches() {
    this.authService.getbenchs().subscribe(data => {
      this.benchdata = data.data;
      // console.log(this.benchdata);

    })
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



  addreasons(sitetype, batchtype) {
    console.log(sitetype, batchtype);
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
      // console.log(data.data);
      this.reasonsdata = data.data;

    });
  }



  getequipments() {
    this.authService.getequipments().subscribe(data => {
      this.equipmentdata = data.data;
      console.log(this.equipmentdata);

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
    // console.log(this.equipments);

  }



  equipmentreq(falg) {
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
        this.snackBar.open(falg + 'ed', 'Ok', { duration: 3000 });
      }

    });

  }


  formulareq_save() {
    let data = {
      request_id: this.br_num,
      formula_id: this.formula_id,
      bath_size: this.batch_size,
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
      flag: "save",
      confirm_flag: true
    }
    console.log(data);

  }


  formulareq_submit() {
    let data = {
      request_id: this.br_num,
      formula_id: this.formula_id,
      bath_size: this.batch_size,
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
      flag: "save",
      confirm_flag: true,
      approver: this.appr
    }
    console.log(data);

  }

  fillingreq_submit() {
    let data = {
      request_id: this.br_num,
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      lab_notebook_number: this.labnotebook,
      formula_id: this.formula_id,
      formula_status: "NEW",
      filling_type: this.filling_type,
      remaining_bulk: this.remaining_bulk,
      gxp: this.gxpvalue,
      batch_number: this.batch_num,
      manufacturing_site: this.sitetype,
      due_date: this.duedate,
      not_applicable_flag: true,
      packaging_type: [],
      formula_description: this.description,
      formulator: this.authService.user_id,
      project: this.project,
      department: this.department,
      manufacturing_date: this.date,
      request_type: "FILLING REQUEST",
      flag: 'submit',
      approver: this.appr

    }
    console.log(data);

  }

  fillingreq_save() {
    let data = {
      request_id: this.br_num,
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      lab_notebook_number: this.labnotebook,
      formula_id: this.formula_id,
      formula_status: "NEW",
      filling_type: this.filling_type,
      remaining_bulk: this.remaining_bulk,
      gxp: this.gxpvalue,
      batch_number: this.batch_num,
      manufacturing_site: this.sitetype,
      due_date: this.duedate,
      not_applicable_flag: true,
      packaging_type: [],
      formula_description: this.description,
      formulator: this.authService.user_id,
      project: this.project,
      department: this.department,
      manufacturing_date: this.date,
      request_type: "FILLING REQUEST",
      flag: 'submit'

    }
    console.log(data);

  }



}