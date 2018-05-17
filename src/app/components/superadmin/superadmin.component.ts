import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

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
  loader: boolean = false;
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

  addsite(value) {
    let site = {
      site: value
    }
    this.authService.addsite(site).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.selectsite();
        this.snackBar.open(value + ' added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add Site', 'ok', { duration: 2000 });
      }
    });
  }

  adddpt(value) {
    let department = {
      department: value
    }
    this.authService.adddpt(department).subscribe(data => {
      console.log(data.message);
      if (data.success) {

        this.snackBar.open(value, 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add department', 'ok', { duration: 2000 });
      }
    });
  }

  addpc(value) {
    let pc = {
      packing_code: value
    }
    this.authService.addpc(pc).subscribe(data => {
      console.log(data.message);
      if (data.success) {

        this.snackBar.open('added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add department', 'ok', { duration: 2000 });
      }
    });
  }


  addbench(site, batch, product, bench) {
    let data = {
      site: site,
      batch_type: batch,
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
        this.snackBar.open('Please re-add bench', 'ok', { duration: 2000 });
      }
    });
  }

  selectsite() {
    this.authService.getsites().subscribe(data => {
      for (let i = 0; i => data.data.length - 1; i++) {
        this.sitemenu.push(data.data[i].site);
      }
    })
  }
  addreason(site, batch, reason) {
    let data = {
      site: site,
      batch_type: batch,
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
