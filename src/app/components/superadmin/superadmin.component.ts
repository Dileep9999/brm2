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
  reasondata: String[];
  departmentdata: String[];
  projectdata: String[];
  equipmentdata: String[];
  add: boolean = true;
  site: String;
  project: String;
  packagingcode: String;
  department: String;
  loader: boolean = false;
  displayedColumns = ['site', 'createdAt'];
  displayedColumns1 = ['reason', 'createdAt'];
  displayedColumns2 = ['department', 'createdAt'];
  displayedColumns3 = ['project', 'createdAt'];
  // displayedColumns4 = ['bench', 'createdAt'];
  displayedColumns5 = ['equipment', 'createdAt'];

  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  dataSource3 = new MatTableDataSource();
  dataSource4 = new MatTableDataSource();
  dataSource5 = new MatTableDataSource();

  packagingcodes: String[];

  applyFilter(filterValue: string) {
    this.site = filterValue;
    console.log(filterValue);
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
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    public flashmessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.users = [];
    this.admins = [];
    this.packagingcodes = [];
    this.superadmins = [];
    this.sitemenu = [];
    this.departmentdata = [];
    this.batchmenu = ["LAB", "PILOT", "OTHERS"];
    this.productmenu = ["COSMETIC", "DRUG"];
    this.getusers();
    this.selectsite();
    this.getdepartments();
    this.getdeprojects();
    this.getpc();
    this.getequipments();
    this.getsites();



  }

  getpc() {
    this.authService.getpc().subscribe(data => {
      this.dataSource4 = data.data;
    });
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
      site: this.site
    }
    this.authService.addsite(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.selectsite();
        this.snackBar.open("ADDED", 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add Site', 'ok', { duration: 2000 });
      }
    });
  }

  adddpt() {
    let data = {
      department: this.department
    }
    console.log(data)
    this.authService.adddpt(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.getdepartments();
        this.snackBar.open('added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add department', 'ok', { duration: 2000 });
      }
    });
  }




  addpc() {
    let data = {
      packagingcode: this.packagingcode
    }
    console.log(data)
    this.authService.addpc(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.getpc();
        this.snackBar.open('added', 'ok', { duration: 2000 });
      } else {
        this.snackBar.open('Please re-add packaging-code', 'ok', { duration: 2000 });
      }
    });
  }



  addproject() {
    let data = {
      project: this.project
    }
    console.log(data)
    this.authService.addproject(data).subscribe(data => {
      console.log(data.message);
      if (data.success) {
        this.getdeprojects();
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



  getsites() {

    this.authService.getsites().subscribe(data => {
      console.log(data);
      this.dataSource.data = data.data;
      this.sitedata = data.data;
      console.log(this.sitedata);
    })
  }



  getdepartments() {
    this.authService.getdepartments().subscribe(data => {
      console.log(data);
      this.dataSource2.data = data.data;
      this.departmentdata = data.data;
      console.log(this.departmentdata);
    })
  }

  getdeprojects() {
    this.authService.getprojects().subscribe(data => {
      console.log(data);
      this.dataSource3.data = data.data;
      this.projectdata = data.data;
      console.log(this.projectdata);
    })
  }

  getequipments() {
    this.authService.getequipments().subscribe(data => {
      console.log(data);
      this.dataSource5.data = data.data;
      this.equipmentdata = data.data;
      console.log(this.equipmentdata);
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

  addapprover(USER) {
    this.authService.addapprover(USER).subscribe(data => {
      console.log("Success");

    });
  }

  removeapprover(USER) {
    this.authService.removeapprover(USER).subscribe(data => {
      console.log(data.success);

    });
  }


}

export interface Element {
  createdAt: string;
  sitedata: string;
  reason: string;
  departmentdata: string;
  projectdata: string;
  equipmentdata: string;
}
