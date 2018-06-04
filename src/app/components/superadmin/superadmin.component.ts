import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig, Snotify } from 'ng-snotify';
import { MatListModule } from '@angular/material/list';

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
  sitemenu1: String[];
  superadmins: String[];
  batchmenu: String[];
  batchmenu1: String[];
  productmenu: String[];
  productmenu1: String[];
  sitedata: any;
  reasondata: any;
  benchdata: any;
  equipmentdata: any;
  departmentdata: String[];
  projectdata: String[];
  add: boolean = true;
  site: any;
  project: String;
  packagingcode: String;
  department: String;
  reason: any;
  batch_type: any;
  equipment_type: any;
  product_type: any;
  loader: boolean = false;
  displayedColumns = ['site', 'createdAt'];
  displayedColumns1 = ['reason', 'createdAt'];
  displayedColumns2 = ['department', 'createdAt'];
  displayedColumns3 = ['project', 'createdAt'];
  displayedColumns5 = ['equipment', 'createdAt'];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  dataSource3 = new MatTableDataSource();
  dataSource4 = new MatTableDataSource();
  dataSource5 = new MatTableDataSource();
  reasons1: any;
  bench: any;
  benches1: any;
  equipments1: String[];
  packagingcodes: String[];
  site_for_reason: any;
  batch_of_reason: any;
  product_of_reason: any;
  equip: any;
  loadcard: String[];
  startDate: Date = new Date;

  addreasons(value, val) {
    this.reasons1 = [];
    this.site_for_reason = value;
    this.batch_of_reason = val;


    for (let i = 0; i <= this.reasondata.length - 1; i++) {
      if (this.site_for_reason === this.reasondata[i].site && this.batch_of_reason === this.reasondata[i].batch_type) {


        this.reasons1 = this.reasondata[i].reason;

      }
    }
  }

  addequipments(value, val) {
    this.equipments1 = [];
    console.log(this.equipmentdata);

    this.equipmentdata.map(e => {
      if (value === e.site && val === e.batch_type) {
        this.equipments1 = e.equipment_list;
      }
    });

    // for (let i = 0; i <= this.equipmentdata.length - 1; i++) {
    //   if (value === this.equipmentdata[i].site && val === this.equipmentdata[i].batch_type) {
    //     this.equipments1 = this.equipmentdata[i].equipment;


    //   }
    // }
  }

  addbenchs(value, va) {


    this.benches1 = [];
    this.site_for_reason = value;

    this.product_of_reason = va;
    for (let i = 0; i <= this.benchdata.length - 1; i++) {
      console.log(this.site_for_reason);
      if (value === this.benchdata[i].site && va === this.benchdata[i].legal_product_category) {
        this.benches1 = this.benchdata[i].bench;

      }
    }
  }



  applyFilter(filterValue: string) {
    this.site = filterValue;

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;



  }
  applyFilter1(filterValue: string) {
    this.department = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource2.filter = filterValue;



  }
  applyFilter3(filterValue: string) {
    this.project = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource3.filter = filterValue;



  }

  applyFilter4(filterValue: string) {
    this.packagingcode = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource4.filter = filterValue;



  }



  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public snotify: SnotifyService,
    public router: Router,
    public flashmessage: FlashMessagesService
  ) { }

  ngOnInit() {
    if (this.authService.user_type === 'USER') {
      this.router.navigate(['/home']);
    }
    this.loadcard = ['a', 'a', 'a', 'a', 'a'];
    this.users = [];
    this.admins = [];
    this.packagingcodes = [];
    this.superadmins = [];
    this.sitemenu = [];
    this.departmentdata = [];
    this.batchmenu = ["LAB", "PILOT", "OTHERS"];
    this.productmenu = ["COSMETIC", "DRUG"];
    this.reasons1 = [];
    this.reasondata = [];
    this.getusers();
    this.selectsite();
    this.getdepartments();
    this.getdeprojects();
    this.getpc();
    this.getsites();
    this.getreasons();
    this.getbenches();
    this.getequipments();
  }

  getpc() {
    this.authService.getpc().subscribe(data => {
      console.log(data);
      this.dataSource4 = data.data;
    });
  }


  abc(value) {

    this.selected = value;

  }
  onLogoutClick() {
    this.authService.logout();


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
      site: this.site
    }
    this.authService.addsite(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.snotify.success('Added', 'Success', {
          timeout: 3000,
          position: SnotifyPosition.rightCenter,
          pauseOnHover: true,
          showProgressBar: true

        })
      }
    });
  }

  adddpt() {
    let data = {
      department: this.department
    }
    // console.log(data)
    this.authService.adddpt(data).subscribe(data => {

      if (data.success) {
        this.snotify.success('Added', 'Success', {
          timeout: 3000,
          position: SnotifyPosition.rightCenter,
          pauseOnHover: true,
          showProgressBar: true

        })
      }
    });
  }




  addpc() {
    let data = {
      packagingcode: this.packagingcode
    }
    // console.log(data)
    this.authService.addpc(data).subscribe(data => {

      if (data.success) {
        this.snotify.success('Added', 'Success', {
          timeout: 3000,
          position: SnotifyPosition.rightCenter,
          pauseOnHover: true,
          showProgressBar: true

        })
      }
    });
  }



  addproject() {
    let data = {
      project: this.project
    }

    this.authService.addproject(data).subscribe(data => {

      if (data.success) {
        this.snotify.success('Added', 'Success', {
          timeout: 3000,
          position: SnotifyPosition.rightCenter,
          pauseOnHover: true,
          showProgressBar: true

        })
      }
    });
  }


  addbench(site3, batch2, product2, bench3) {
    let data = {
      site: site3,
      batch_type: batch2,
      legal_product_category: product2,
      bench: [bench3]
    }
    console.log(data)
    this.authService.addbench(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.snotify.success('Added', 'Success', {
          timeout: 3000,
          position: SnotifyPosition.rightCenter,
          pauseOnHover: true,
          showProgressBar: true

        })
      }
    });
  }

  addeqpt(site, batch, opteq, equipment) {
    let data = {
      site: site,
      batch_type: batch,
      optional_equipments: [opteq],
      equipment_list: [equipment]
    }
    console.log(data);

    this.authService.addeqpt(data).subscribe(data => {

      if (data.success) {

        this.snackBar.open('added', 'ok', { duration: 2000 });
      }
    });
  }



  selectsite() {
    this.authService.getsites().subscribe(data => {
      if (data.success) {
        data.data.map(d => {
          this.sitemenu.push(d.site);
        });
      }
    });
  }



  getsites() {

    this.authService.getsites().subscribe(data => {
      console.log(data);
      this.dataSource.data = data.data;
      this.sitedata = data.data;
      // console.log(this.sitedata);
    })
  }

  getdepartments() {
    this.authService.getdepartments().subscribe(data => {
      // console.log(data);
      this.dataSource2.data = data.data;
      this.departmentdata = data.data;
      // console.log(this.departmentdata);
    })
  }

  getdeprojects() {
    this.authService.getprojects().subscribe(data => {
      // console.log(data);
      this.dataSource3.data = data.data;
      this.projectdata = data.data;
      // console.log(this.projectdata);
    })
  }

  // getequipments() {
  //   this.authService.getequipments().subscribe(data => {

  //     this.dataSource5.data = data.data;
  //     this.equipmentdata = data.data;

  //   })
  // }


  makeasadmin(user) {
    this.authService.makeasadmin(user).subscribe(data => {
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

  addapprover(USER) {
    this.authService.addapprover(USER).subscribe(data => {
      this.getusers();

    });
  }

  removeapprover(USER) {
    this.authService.removeapprover(USER).subscribe(data => {
      this.getusers();

    });
  }

  getreasons() {
    this.authService.getreasons().subscribe(data => {

      this.reasondata = data.data;
    });
  }

  getequipments() {
    this.authService.getequipments().subscribe(data => {
      if (data.success) {
        this.equipmentdata = data.data;
      }
    });
  }





  openDialog(): void {
    let dialogRef = this.dialog.open(NewUser, {
      width: '480px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.authService.registerUser(result).subscribe(data => {
        if (data.success) {
          this.snotify.simple('New User Created', 'Added', {
            timeout: 3000,
            position: SnotifyPosition.rightCenter,
            pauseOnHover: true,
            showProgressBar: false

          })
        }
      });

      console.log('The dialog was closed');

    });
  }

  getbenches() {
    this.authService.getbenches().subscribe(data => {
      this.benchdata = data.data;
    });


  }

}

export interface Element {
  createdAt: string;
  sitedata: string;
  reason: string;
  bench: string;
  benchdata: string;
  departmentdata: string;
  projectdata: string;
  equipmentdata: string;
}



@Component({
  selector: 'dialog-date-Range',
  templateUrl: 'newuser.html',
})

export class NewUser {
  user_id: String;
  email: String;
  password: String;
  password1: String;

  btndisabled: boolean = true;



  constructor(
    public dialogRef: MatDialogRef<NewUser>,
    private router: Router,
    public snotify: SnotifyService,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }




  ngOnInit() {


  }



  submit() {
    if (this.password === this.password1) {
      let data = {
        user_id: this.user_id,
        email: this.email,
        password: this.password

      }
      this.dialogRef.close(data);
    } else {
      this.snotify.error('Mismatch', 'Password', {
        timeout: 4000,
        showProgressBar: false,
        closeOnClick: true,
        position: SnotifyPosition.centerCenter,
        pauseOnHover: true,

      })

    }


  }


  submitenable() {

  }
}