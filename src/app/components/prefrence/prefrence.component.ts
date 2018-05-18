import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RouterModule, Router } from '@angular/router';

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
  constructor(public router: Router) { }

  ngOnInit() {
    this.checked = true;
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


