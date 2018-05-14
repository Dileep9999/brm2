import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  search: String;
  value: String;
  Searchmenu: String[];
  Searchvalue: String;
  clear: String;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    // this.value='';
    this.Searchmenu = ['All', 'Simatic Code', 'Formula code', 'Packaging Type', 'Spec num', 'Request Num', 'Request Type'];
    this.Searchvalue = 'All';
    // console.log(this.Searchmenu);

  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }


  onKeydown(event) {
    //if (event.key === "Enter") {
    //do search...

    console.log(this.search);
  }
  updatedsearchvalue(search) {
    this.Searchvalue = search;

  }
  clearinput() {
    this.value = '';
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  openDialog1(): void {
    let dialogRef = this.dialog.open(DialogOverview, {
      width: '750px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  gotoprefrences() {
    this.router.navigate(['/prefrence'])
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog1',
  templateUrl: 'fillingreq.html',
})
export class DialogOverview {

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}