import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Jsonp } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

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
  approvers: any;
  appr: String;
  packagingcode: String;
  packagingcodes: String[];
  notapplicable: boolean = false;
  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    private snotify: SnotifyService
  ) { }

  ngOnInit() {
    this.project = this.authService.project;
    this.packagingcodes = [];
    this.department = this.authService.department;
    this.newrequest();
    this.sitemenu = JSON.parse(localStorage.getItem('sites'));
    this.approvers = [];
    this.getusers();
    this.getpackagingcodes();
  }


  getusers() {
    this.authService.getusers("USER").subscribe(data => {
      if (data.success) {
        console.log(data);

        for (let i = 0; i <= data.data.length; i++) {
          if
          (data.data[i].approver_permission) {
            this.approvers.push(data.data[i].user_id)
          }
        }
        console.log(this.approvers);


      }

    });

    // this.authService.getusers("ADMIN").subscribe(data => {

    // });
    // this.authService.getusers("SUPERADMIN").subscribe(data => {

    // });
  }

  getpackagingcodes() {

    this.authService.getpc().subscribe(data => {
      //  data.data.map(
      //   this.packagingcodes.push(data.data.packaging_code);
      //  )

      for (let i = 0; i <= data.data.length - 1; i++) {
        this.packagingcodes.push(data.data[i].packaging_code);
      }


    });

  }


  save(flag) {



    let data = {
      request_id: this.fr_num,
      site: this.sitetype,
      batch_type: this.batch_type,
      legal_product_category: this.legal_product_category,
      lab_note_book_number: this.labnotebook,
      formula_id: this.formula_id,
      formula_status: "NEW",
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
      flag: 'save'

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
