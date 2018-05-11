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
  batchmenu: String[];
  constructor(
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    public flashmessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.users.sort();
    this.sitemenu = [];
    this.selectsite();
    this.batchmenu = ["LAB", "PILOT", "OTHERS"]

  }
  sort() {
    this.users.sort();
  }


  abc(value) {
    console.log(value);
    this.selected = value;

  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }


  addsite(value) {
    let site = {

      site: value
    }

    this.authService.addsite(site).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.snackBar.open(value, 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add Site', 'ok', { duration: 2000 });
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
}
