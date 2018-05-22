import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Options } from 'fullcalendar';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-batchrequest',
  templateUrl: './batchrequest.component.html',
  styleUrls: ['./batchrequest.component.css']
})
export class BatchrequestComponent implements OnInit {



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
  batch_size: String = 'KG';
  batch_unit: String;
  pr_number: String;
  description: String;
  labnotebook: String;
  filling_type: String;
  remaining_bulk: String;
  batch_num: any;
  duedate: String;
  sitefilling: String;


  constructor(public authService: AuthService) { }


  test() {

    console.log(this.reason);

  }

  ngOnInit() {

    this.project = this.authService.project;
    this.department = this.authService.department;
    this.reasons = [];
    this.departments = JSON.parse(localStorage.getItem('departments'));
    this.projects = JSON.parse(localStorage.getItem('projects'));
    this.sitemenu = [];
    this.sitemenuload();
    this.loadreasons();
    this.newrequest();
    this.getequipments();
  }

  getusers() {
    this.authService.getusers("USER").subscribe(data => {
      if (data.success) {
        for (let i = 0; i <= data.data.length; i++) {
          if
          (data.data[i].approver_permission) {
            this.approvers.push(data.data[i].user_id)
          }
        }

      }

    });

    this.authService.getusers("ADMIN").subscribe(data => {

    });
    this.authService.getusers("SUPERADMIN").subscribe(data => {

    });
  }

  newrequest() {
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

    // this.bulk=!this.bulk;
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
    // this.condition=!this.condition;
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
    // this.destruct=!this.destruct;
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
    // this. storage=!this. storage;
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
      console.log(data.data);

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
    console.log(this.equipments);

  }



  equipmentreq(date) {
    console.log(this.date);


    let data = {
      request_id: this.br_num,
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      reason_for_this_batch: this.reason.value,
      gxp: this.gxpvalue,
      bench_id: 'bench 1',
      request_date: this.date,
      approver: 'asifali',
      flag: "submit",


    }
    console.log(data);



    this.authService.equipmentrequest(data).subscribe(data => {
      if (data.success) {
        console.log('Submitted success');
      }
      else {
        console.log("Not Submitted");
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
      confirm_flag: true
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
      flag: 'submit'

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