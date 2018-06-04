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
  reqs: any;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public router: Router) {

  }

  ngOnInit() {
    // this.value='';
    this.Searchmenu = ['All', 'Simatic Code', 'Formula code', 'Packaging Type', 'Spec num', 'Request Num', 'Request Type'];
    this.Searchvalue = 'All';
    this.getreqs();
    this.reqs = [];



  }


  batchreq(req) {


    this.authService.req = req;
    this.authService.permission = true;
    this.router.navigate(['/batchrequest']);

  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }

  getreqs() {
    this.authService.getallrequests().subscribe(data => {


      this.reqs = data.data;


    });
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
  openDialog2(): void {
    let dialogRef = this.dialog.open(Rmrequest, {
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
  projects: String[];
  departments: String[];
  project: String;
  department: String;
  a: String = JSON.parse(localStorage.getItem("projects"));
  btndisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private router: Router,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.projects = [];
    this.departments = [];
    this.getProjects();
    this.getDepartments();
    console.log(this.projects);

  }
  submitenable(value, value1) {
    console.log(value, value1);
    this.project = value;
    this.department = value1;
    if (this.project !== "None" && this.department !== "None") {
      this.btndisabled = false;
    }

  }
  submit() {
    this.authService.redirecttobatch(this.project, this.department);
    this.authService.permission = false;

  }

  getDepartments() {
    this.departments = JSON.parse(localStorage.getItem('departments'));
    // this.authService.getdepartments().subscribe(data => {
    //   for (let i = 0; i <= data.data.length; i++) {
    //     this.departments.push(data.data[i].department)
    //   }
    // });
  }

  getProjects() {
    this.projects = JSON.parse(localStorage.getItem("projects"));
    // this.authService.getprojects().subscribe(data => {
    //   for (let i = 0; i <= data.data.length; i++) {
    //     this.projects.push(data.data[i].project)
    //   }
    // });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog1',
  templateUrl: 'fillingreq.html',
})
export class DialogOverview {
  projects: String[];
  departments: String[];
  project: String;
  department: String;

  btndisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    private router: Router,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.projects = [];
    this.departments = [];
    this.getProjects();
    this.getDepartments();


  }


  submitenable(value, value1) {

    this.project = value;

    this.department = value1;
    if (this.project !== "None" && this.department !== "None") {
      this.btndisabled = false;
    }

  }
  getDepartments() {
    this.departments = JSON.parse(localStorage.getItem('departments'));
    // this.authService.getdepartments().subscribe(data => {
    //   for (let i = 0; i <= data.data.length; i++) {
    //     this.departments.push(data.data[i].department)
    //   }
    // });
  }

  getProjects() {
    this.projects = JSON.parse(localStorage.getItem("projects"));
    // this.authService.getprojects().subscribe(data => {
    //   for (let i = 0; i <= data.data.length; i++) {
    //     this.projects.push(data.data[i].project)
    //   }
    // });
  }
  submit() {
    console.log('submit');

    this.authService.redirecttofilling(this.project, this.department);
    this.dialogRef.close();
  }


}



@Component({
  selector: 'dialog-overview-rm',
  templateUrl: 'rm.html',
})

export class Rmrequest {
  projects: String[];
  departments: String[];
  project: String;
  department: String;

  btndisabled: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<Rmrequest>,
    private router: Router,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.projects = [];
    this.departments = [];
    this.getProjects();
    this.getDepartments();



  }

  submit() {
    console.log('submit');
    this.authService.redirecttoRM(this.project, this.department);
    this.dialogRef.close();
  }


  getDepartments() {
    this.departments = JSON.parse(localStorage.getItem('departments'));
    // this.authService.getdepartments().subscribe(data => {
    //   for (let i = 0; i <= data.data.length; i++) {
    //     this.departments.push(data.data[i].department)
    //   }
    // });
  }

  getProjects() {
    this.projects = JSON.parse(localStorage.getItem("projects"));
    // this.authService.getprojects().subscribe(data => {
    //   for (let i = 0; i <= data.data.length; i++) {
    //     this.projects.push(data.data[i].project)
    //   }
    // });
  }

  submitenable(value, value1) {
    this.project = value;
    this.department = value1;
    if (this.project !== "None" && this.department !== "None") {
      this.btndisabled = false;
    }

  }

}