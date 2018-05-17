import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


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
  newColor5 = false;
  newColor6 = false;
  newColor7 = false;
  filling = true;
  plan = false;
  partner = false;
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
  reason: String;
  gxpvalue: boolean = true;
  departments: String[];
  projects: String[];
  equipments: String[];

  date: String;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.reasons = [];
    this.departments = JSON.parse(localStorage.getItem('departments'));
    this.projects = JSON.parse(localStorage.getItem('projects'));
    this.sitemenu = [];
    this.sitemenuload();
    this.loadreasons();
    this.newrequest();
  }

  newrequest() {
    this.authService.submitnewreq().subscribe(data => {
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
    // this.newColor = !this.newColor;
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
  toggleColor1(sitevalue) {
    // this.newColor1 = !this.newColor1;
    if (this.newColor1 = true) {
      this.newColor1 = true;
    }
    else {
      this.newColor1 = !this.newColor1;
    }
    this.newColor = false;
    this.newColor2 = false;
    this.batchtype = 'PILOT';
    this.addreasons(sitevalue, this.batchtype);
  }
  toggleColor2(sitevalue) {
    // this.newColor2 = !this.newColor2;
    if (this.newColor2 = true) {
      this.newColor2 = true;
    }
    else {
      this.newColor2 = !this.newColor2;
    }
    this.newColor = false;
    this.newColor1 = false;
    this.batchtype = 'OTHERS';
    this.addreasons(sitevalue, this.batchtype);
  }
  toggleColor3() {
    // this.newColor3 = !this.newColor3;
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
    // this.newColor4 = !this.newColor4;
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
    // this.newColor5 = !this.newColor5;
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
    // this.newColor6 = !this.newColor6;
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
    // this.newColor7 = !this.newColor7;
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
    // this.filling=!this.filling;
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
    //
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
    // this.partner=!this.partner;
    if (this.partner = true) {
      this.partner = true;
    }
    else {
      this.partner = !this.partner;
    }
    this.filling = false;
    this.plan = false;
  }

  addreasons(sitetype, batchtype) {
    for (let i = 0; i <= this.reasonsdata.length; i++) {
      if (sitetype === this.reasonsdata[i].site && batchtype === this.reasonsdata[i].batch_type) {
        if (this.reasonsdata[0] === undefined) {
          this.reasons = ["NO Reasons For "]
        }
        this.reasons = this.reasonsdata[i].reason;
      }
    }
  }




  loadreasons() {
    this.authService.getreasons().subscribe(data => {
      this.reasonsdata = data.data;


    });
  }


  equipmentreq(date) {




    let data = {
      request_id: this.br_num,
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      reason_for_this_batch: this.reason,
      gxp: this.gxpvalue,
      bench_id: 'bench_1',
      request_date: date,
      approver: localStorage.getItem('user_id'),
      flag: "submit"
    }


    this.authService.equipmentrequest(data).subscribe(data => {
      if (data.success) {
        console.log('Submitted success');
      }
      else {
        console.log("Not Submitted");
      }
    });

  }

}