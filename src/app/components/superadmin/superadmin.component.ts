import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {
  users: String[] = ['sasank', 'pmp', 'dilip', 'asif', 'sasank', 'pmp', 'dilip', 'aasif', 'sasank', 'pmp', 'dilip', 'absif'];
  selected: String;
  admins: String[] = ['sasank', 'pmp', 'dilip', 'asif', 'sasank', 'pmp', 'dilip', 'asif', 'sasank', 'pmp', 'dilip', 'asif'];
  sitemenu: String[];
  superadmins: String[];
  batchmenu: String[];
  productmenu: String[];
  sitedata: String[];
  add: boolean = true;

  loader: boolean = false;
  displayedColumns = ['site', 'createdAt'];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    console.log(filterValue);

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(filterValue);
    for (let i = 0; i <= this.sitemenu.length; i++) {
      if (this.sitemenu[i] === filterValue) {
        this.add = false;
      }
    }

  }



  constructor(
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    public flashmessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.users = [];
    this.admins = [];
    this.superadmins = [];
    this.sitemenu = [];
    this.batchmenu = ["LAB", "PILOT", "OTHERS"];
    this.productmenu = ["Cosmetic", "Drug"];
    this.getusers();
    this.selectsite();




  }


  abc(value) {
    console.log(value);
    this.selected = value;

  }
  onLogoutClick() {
    this.authService.logout();
    // this.router.navigate(['/']);

  }
  getusers() {
    this.authService.getusers("USER").subscribe(data => {
      if (data.success) {
        this.users = data.data;
        this.loader = true;
      }

    });

    this.authService.getusers("ADMIN").subscribe(data => {
      this.admins = data.data;
    });
    this.authService.getusers("SUPERADMIN").subscribe(data => {
      this.superadmins = data.data;
    });
  }

  addreason(site1, batch1, reason) {
    let data = {
      site: site1,
      batch_type: batch1,
      reason: [reason]
    }
    console.log(data);

    this.authService.addreasons(data).subscribe(data => {
      if (data.success) {
        this.snackBar.open('added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add Site', 'ok', { duration: 3000 });
      }
    });
  }
  addsite(value) {
    let data = {
      site: value
    }
    this.authService.addsite(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.selectsite();
        this.snackBar.open(value, 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add Site', 'ok', { duration: 2000 });
      }
    });
  }

  adddpt(value) {
    let data = {
      department: value
    }
    console.log(data)
    this.authService.adddpt(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {

        this.snackBar.open(value, 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add department', 'ok', { duration: 2000 });
      }
    });
  }

  addpc(value) {
    let data = {
      packagingcode: value
    }
    console.log(data)
    this.authService.addpc(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {

        this.snackBar.open('added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add packaging-code', 'ok', { duration: 2000 });
      }
    });
  }

  addproject(value) {
    let data = {
      project: value
    }
    console.log(data)
    this.authService.addproject(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {

        this.snackBar.open('added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add project', 'ok', { duration: 2000 });
      }
    });
  }


  addbench(site3, batch2, product, bench) {
    let data = {
      site: site3,
      batch_type: batch2,
      legal_product_category: product,
      bench: [bench]
    }
    console.log(data)
    this.authService.addbench(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {

        this.snackBar.open('added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add bench', 'ok', { duration: 2000 });
      }
    });
  }

  addeqpt(site, batch, equipment) {
    let data = {
      site: site,
      batch_type: batch,
      equipment_list: [equipment]
    }
    console.log(data)
    this.authService.addeqpt(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {

        this.snackBar.open('added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add equipment', 'ok', { duration: 2000 });
      }
    });
  }

  selectsite() {
    this.authService.getsites().subscribe(data => {
      console.log(data);
      this.dataSource.data = data.data;
      this.sitedata = data.data;
      console.log(this.sitedata);

      for (let i = 0; i => data.data.length - 1; i++) {
        this.sitemenu.push(data.data[i].site);
      }
    })
  }

  makeasadmin(user) {
    this.authService.makeasadmin(user).subscribe(data => {
      console.log(data);

      if (data.success) {
        this.getusers();
      }
    });
  }
  removefromadmin(admin) {
    this.authService.removefromadmin(admin).subscribe(data => {
      if (data.success) {
        this.getusers();
      }
    });
  }
}

export interface Element {
  createdAt: string;
  site: string;

}

// const ELEMENT_DATA: Element[] = ;