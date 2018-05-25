import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Http } from '@angular/http';
import "rxjs/add/operator/catch";
import { MatSnackBar } from '@angular/material';

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
  fr_num: String;
  updateddate: String;
  month: number;
  day: number;
  year: number;
  percent: number = 15;
  sitemenu: String[];
  mfgdate: String;
  projects = JSON.parse(localStorage.getItem('projects'));
  departments = JSON.parse(localStorage.getItem('departments'));
  labnotebook: String;
  description: String;
  formula_id: String;
  batch_size: number;
  batch_unit: String = "KG";
  batch_type: String;
  pr_number: number;
  rm_num: String;
  appr: String;
  approvers: String[];
  row_matrials: any = {
    trade_name: '',
    rm_num: '',
    percentage: '',
    quantity_required: '',
    simatic_lab_gxp_stock: '',
    simatic_pilot_stock: '',
    simatic_lab_stock: '',
    quantity_to_order: ''
  };
  labnotebooknums: String[];
  formulaids: String[];


  constructor(
    public authService: AuthService,
    public http: Http,
    public snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    this.approvers = [];
    this.labnotebooknums = [];
    this.formulaids = [];
    this.project = this.authService.project;
    this.department = this.authService.department;
    this.newrequest();
    this.sitemenu = JSON.parse(localStorage.getItem('sites'));
    this.getusers();
    this.getlabnums();
  }

  getrowmatrials() {

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


  newrequest() {
    this.authService.submitnewreq("BATCH RM ORDER").subscribe(data => {
      console.log(data);

      this.rm_num = data.data.request_id;
      this.year = data.data.lastModified.slice(0, 4);
      this.month = data.data.lastModified.slice(5, 7);
      this.day = data.data.lastModified.slice(8, 10);
      this.updateddate = this.year + '/' + this.month + '/' + this.day;
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
    this.batch_type = "LAB"
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
    this.batch_type = "PILOT"
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
    this.batch_type = "GXP BATCH"
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
  formatdatemfg(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    this.mfgdate = year + '-' + month + '-' + day;
    console.log(this.mfgdate);

  }


  submit() {
    let data = {
      request_id: this.rm_num,
      formula_id: this.formula_id,
      batch_size: this.batch_size,
      batch_unit: this.batch_unit,
      lab_note_book_number: this.labnotebook,
      raw_material: [{
        trade_name: "Flipkart",
        rm_no: "RMT451",
        percentage: 0.75
      },
      {
        trade_name: "Amazon",
        rm_no: "RMT451",
        percentage: 0.80
      }],
      site: this.sitetype,
      batch_type: this.batch_type,
      legal_product_category: this.legal_product_category,
      formula_status: "new",
      formula_description: this.description,
      formula_pr_number: this.pr_number,
      formulator: this.authService.user_id,
      project: this.project,
      department: this.department,
      manufacturing_date: this.mfgdate,
      request_type: "BATCH RM ORDER",
      approver: this.appr,
      performed_by: "dileep",
      flag: "submit",
      confirm_flag: true
    }
    console.log(data);
    this.authService.submitrmrequest(data).subscribe(data => {
      console.log(data);
      this.snackBar.open('Success', 'Ok', { duration: 3000 });
    });
  }


  save() {
    let data = {
      request_id: this.rm_num,
      formula_id: this.formula_id,
      batch_size: this.batch_size,
      batch_unit: this.batch_unit,
      lab_note_book_number: this.labnotebook,
      raw_material: [],
      site: this.sitetype,
      batch_type: this.batch_type,
      legal_product_category: this.legal_product_category,
      formula_status: "new",
      formula_description: this.description,
      formula_pr_number: this.pr_number,
      formulator: this.authService.user_id,
      project: this.project,
      department: this.department,
      manufacturing_date: this.mfgdate,
      request_type: "BATCH RM ORDER",
      flag: "save",
      approver: this.appr,
      confirm_flag: false

    }
    console.log(data);
    this.authService.savermrequest(data).subscribe(data => {
      console.log(data.data.message);
      this.snackBar.open('Saved', 'Ok', { duration: 3000 });

    });

  }


}
