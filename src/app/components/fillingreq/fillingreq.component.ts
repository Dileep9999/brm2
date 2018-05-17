import { Component, OnInit } from '@angular/core';

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
  legal_product_category: String;
  filling_type: String;
  remaining_bulk: String;
  batch_type: String;

  constructor() { }

  ngOnInit() {
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
    this.filling_type = "BULK";
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

}
