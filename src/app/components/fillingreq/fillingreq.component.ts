import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Jsonp } from '@angular/http';

@Component({
  selector: 'app-fillingreq',
  templateUrl: './fillingreq.component.html',
  styleUrls: ['./fillingreq.component.css']
})
export class FillingreqComponent implements OnInit {
  filling = true;
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
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.project = this.authService.project;
    this.department = this.authService.department;
    this.newrequest();
    this.sitemenu = JSON.parse(localStorage.getItem('sites'));


  }

  save() {



    let data = {
      request_id: this.fr_num,
      site: this.sitetype,
      batch_type: this.batch_type,
      legal_product_category: this.legal_product_category,
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
      manufacturing_date: this.mfgdate,
      request_type: "FILLING REQUEST",
      flag: 'save'

    }
    console.log(data);

  }
  submit() {
    let data = {
      request_id: this.fr_num,
      site: this.sitetype,
      batch_type: this.batch_type,
      legal_product_category: this.legal_product_category,
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
      manufacturing_date: this.mfgdate,
      request_type: "FILLING REQUEST",
      flag: 'save'

    }
    console.log(data);


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
    // this.filling=!this.filling;
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
    // this.partner=!this.partner;
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
    // this.approver=!this.approver;
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






  newrequest() {
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
