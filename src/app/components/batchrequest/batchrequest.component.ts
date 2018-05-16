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
    this.newColor = !this.newColor;
    this.newColor1 = false;
    this.newColor2 = false;
    this.batchtype = 'LAB';
    this.addreasons(sitevalue, this.batchtype);
  }
  toggleColor1(sitevalue) {
    this.newColor1 = !this.newColor1;
    this.newColor = false;
    this.newColor2 = false;
    this.batchtype = 'PILOT';
    this.addreasons(sitevalue, this.batchtype);
  }
  toggleColor2(sitevalue) {
    this.newColor2 = !this.newColor2;
    this.newColor = false;
    this.newColor1 = false;
    this.batchtype = 'OTHERS';
    this.addreasons(sitevalue, this.batchtype);
  }
  toggleColor3() {
    this.newColor3 = !this.newColor3;
    this.newColor4 = false;
    this.legalproductcatagory = 'DRUG';
  }
  toggleColor4() {
    this.newColor4 = !this.newColor4;
    this.newColor3 = false;
    this.legalproductcatagory = 'COSMETIC'
  }
  toggleColor5() {
    this.newColor5 = !this.newColor5;
    this.newColor6 = false;
    this.newColor7 = false;
  }
  toggleColor6() {
    this.newColor6 = !this.newColor6;
    this.newColor5 = false;
    this.newColor7 = false;
  }
  toggleColor7() {
    this.newColor7 = !this.newColor7;
    this.newColor6 = false;
    this.newColor5 = false;
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