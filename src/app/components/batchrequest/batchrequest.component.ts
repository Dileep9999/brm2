import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-batchrequest',
  templateUrl: './batchrequest.component.html',
  styleUrls: ['./batchrequest.component.css']
})
export class BatchrequestComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;


  newColor = false;
  newColor1 = false;
  newColor2 = false;
  newColor3 = false;
  newColor4 = false;
  newColor5 = true;
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
  reason = new FormControl();
  gxpvalue: boolean = true;
  departments: String[];
  projects: String[];
  equipments: String[];
  equipmentdata: any;
  optionalequip: any;
  date: String;
  constructor(public authService: AuthService) { }


  test() {

    console.log(this.reason);

  }

  ngOnInit() {
    this.authService.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {

          left: 'month,agendaWeek,agendaDay,listMonth',
          center: 'title ',
          right: 'prev,title,next'
        },
        events: data
      };
    });
    this.project = this.authService.project;
    this.department = this.authService.department;
    this.reasons = [];
    this.departments = JSON.parse(localStorage.getItem('departments'));
    this.projects = JSON.parse(localStorage.getItem('projects'));
    this.sitemenu = [];
    this.sitemenuload();
    this.loadreasons();
    this.newrequest();
    this.getequipments();
  }

  newrequest() {
    let request_type = "BATCH REQUEST"
    this.authService.submitnewreq(request_type).subscribe(data => {
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
  toggleColor1() {

    if (this.newColor1 = true) {
      this.newColor1 = true;
    }
    else {
      this.newColor1 = !this.newColor1;
    }
    this.newColor = false;
    this.newColor2 = false;
    this.batchtype = 'PILOT';
    this.addequipmentstolist();
    this.addreasons(this.sitetype, this.batchtype);

  }
  toggleColor2() {
    if (this.newColor2 = true) {
      this.newColor2 = true;
    }
    else {
      this.newColor2 = !this.newColor2;
    }
    this.newColor = false;
    this.newColor1 = false;
    this.batchtype = 'OTHERS';
    this.addreasons(this.sitetype, this.batchtype);
    this.addequipmentstolist();
  }

  toggleColor3() {

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
    console.log(sitetype, batchtype);
    for (let i = 0; i <= this.reasonsdata.length - 1; i++) {
      if (this.sitetype === this.reasonsdata[i].site && this.batchtype === this.reasonsdata[i].batch_type) {
        if (this.reasonsdata[0] === undefined) {
          this.reasons = ["NO Reasons For "]
        }
        this.reasons = this.reasonsdata[i].reason;
        console.log(this.reasons);

      }
    }
  }


  loadreasons() {
    this.authService.getreasons().subscribe(data => {
      console.log(data.data);

      this.reasonsdata = data.data;


    });
  }



  getequipments() {
    this.authService.getequipments().subscribe(data => {
      this.equipmentdata = data.data;
      console.log(this.equipmentdata);

    });
  }




  addequipmentstolist() {
    console.log(this.equipmentdata[2].site, this.sitetype);

    for (let i = 0; i <= this.equipmentdata.length - 1; i++) {
      if (this.sitetype === this.equipmentdata[i].site && this.batchtype === this.equipmentdata[i].batch_type) {
        this.equipments = this.equipmentdata[i].equipment_list;
        this.optionalequip = this.equipmentdata.optional_equipment;
      }
    }
    console.log(this.equipments);

  }



  equipmentreq(date) {

    let data = {
      request_id: this.br_num,
      site: this.sitetype,
      batch_type: this.batchtype,
      legal_product_category: this.legalproductcatagory,
      reason_for_this_batch: this.reason.value,
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