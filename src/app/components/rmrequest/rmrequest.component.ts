import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rmrequest',
  templateUrl: './rmrequest.component.html',
  styleUrls: ['./rmrequest.component.css']
})
export class RmrequestComponent implements OnInit {

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
  constructor() { }
  ngOnInit() {
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
}
