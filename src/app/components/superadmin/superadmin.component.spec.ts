import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminComponent } from './superadmin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { MatSnackBarModule } from "@angular/material";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatIconModule, MatCardModule, MatSlideToggleModule, MatDividerModule } from '@angular/material'
import { MatMenuModule } from '@angular/material/menu';

import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpModule } from '@angular/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { MatSelectModule } from '@angular/material/select';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';

import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from "ag-grid-angular/main";



import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


import { MatToolbarModule } from '@angular/material/toolbar';
import { SnotifyModule, SnotifyService, ToastDefaults, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';



describe('SuperadminComponent', () => {
  let component: SuperadminComponent;
  let fixture: ComponentFixture<SuperadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuperadminComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule,
        FormsModule,
        NgCircleProgressModule,
        MatRadioModule,
        HttpModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatExpansionModule,
        MatListModule,
        MatAutocompleteModule,
        MatTabsModule,
        AgGridModule,
        MatListModule,
        MatToolbarModule,
        FormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatExpansionModule,

        MatMenuModule,
        MatIconModule,
        MatProgressBarModule,
        MatCardModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatInputModule,
        MatButtonModule,
        SnotifyModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        Ng2SearchPipeModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        NgCircleProgressModule,
        MatTabsModule,

        AgGridModule,
        MatAutocompleteModule



      ],
      providers: [AuthService, {
        provide: 'SnotifyToastConfig', useValue: ToastDefaults
      }, SnotifyService, CircleProgressOptions]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
