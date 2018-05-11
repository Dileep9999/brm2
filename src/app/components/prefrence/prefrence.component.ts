import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-prefrence',
  templateUrl: './prefrence.component.html',
  styleUrls: ['./prefrence.component.css']
})
export class PrefrenceComponent implements OnInit {
  checked:boolean;

  constructor(public router:Router) { }

  ngOnInit() {
    this.checked=true;
  }

}


