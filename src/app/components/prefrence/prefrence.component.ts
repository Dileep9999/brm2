import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  drug = true;
  cosmetic = false;
  view: String;
  legal_product_category: String;
  lab = true;
  pilot = false;
  other = false;
  batch_type: String;
  projects = JSON.parse(localStorage.getItem('projects'));
  departments = JSON.parse(localStorage.getItem('departments'));
  sitemenu: String[];
  sitetype: String;
  bm_req_check: boolean = true;
  rm_req_check: boolean = true;
  fr_req_check: boolean = true;
  gxpvalue: boolean;
  myreq: String;
  formula_req_contents: boolean;



  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.checked = true;
    this.sitemenu = JSON.parse(localStorage.getItem('sites'));
  }
  getprefrence() {
    this.authService.getprefrences().subscribe(data => {
      if (data.success) {
        this.formula_req_contents = data.data.formula_request_contents;
        this.sitetype = data.data.site;


      }
    });
  }

  save() {
    let data = {
      calender_view_request_type: this.calender_view,
      calender_view_site: this.sitetype,
      calender_view_legal_product_category: "COSMETIC",
      calender_view_batch_type: "LAB",
      home_view_my_request_batch_request: this.bm_req_check,
      home_view_my_request_filling_request: this.fr_req_check,
      home_view_my_request_rm_request: this.rm_req_check,
      request_filter_mode: this.mode,
      request_filter_view: this.view,
      request_filter_my_requests: this.myreq,
      request_filter_filter_gxp: false,
      request_filter_filter_batch_type: ["PILOT", "LAB"],
      request_filter_filter_manufacturing_date: ["2018-05-14", "2018-05-13"],
      request_filter_filter_site: ["VJC", "SJC"],
      request_filter_filter_legal_product_category: ["COSMETIC"],
      request_filter_filter_status: ["NEW"],
      request_filter_filter_project: ["Project 3"],
      request_filter_filter_partner: ["dileep"],
      request_contents_site: "VJC",
      request_contents_legal_product_category: "COSMETIC",
      request_contents_batch_type: "PILOT",
      formula_request_contents: "SPEC NUMBER"
    }
    this.authService
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
    this.mode = "LIST"
  }
  tile1() {
    if (this.tile = true) {
      this.tile = true;
    }
    else {
      this.tile = !this.tile;
    }
    this.list = false;
    this.mode = "TILE"
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
    this.view = "FAVORITES"
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
    this.view = "REQUEST"
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
    this.view = "ALL REQUESTS";
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


}


