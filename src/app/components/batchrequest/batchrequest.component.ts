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
  date: Date = new Date();
  month = this.date.getMonth();
  today = this.date.getDay();
  year = this.date.getFullYear();
  d = this.today + '-' + this.month + '-' + this.year;
  percent: number = 15;
  legalproductcatagory: String;
  batchtype: String;
  reasons: String[];
  reasonsdata: any;
  sitetype: String;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.reasons = [];

    this.sitemenu = [];
    this.sitemenuload();
    this.date = new Date();
    this.br_num = 'BR' + '-' + this.year + '-' + '0000' + (0 + 7);
    this.loadreasons();
  }

  sitemenuload() {
    this.authService.getsites().subscribe(data => {
      for (let i = 0; i => data.data.length - 1; i++) {
        this.sitemenu.push(data.data[i].site);
      }
    });
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
        this.reasons = this.reasonsdata[i].reason;
      }
    }
  }


  loadreasons() {
    this.authService.getreasons().subscribe(data => {
      this.reasonsdata = data.data;
    });
  }



  equipmentreq() {
    let data = {
      request_id: '',
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      reason_for_this_batch: '',
      gxp: '',
      bench_id: 'bench_1',
      request_date: '',
      approver: '',
      falg: "submit"
    }
  }

}