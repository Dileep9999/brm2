import { TestBed, async } from '@angular/core/testing';
import { AppComponent, } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PrefrenceComponent } from './components/prefrence/prefrence.component';
import { BatchrequestComponent } from './components/batchrequest/batchrequest.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { RmrequestComponent } from './components/rmrequest/rmrequest.component';
import { FillingreqComponent } from './components/fillingreq/fillingreq.component';
import { LoginComponent } from './components/login/login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
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

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { MatSelectModule } from '@angular/material/select';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from "ag-grid-angular/main";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


import { MatToolbarModule } from '@angular/material/toolbar';

const appRoutes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'prefrence', component: PrefrenceComponent },
  { path: 'batchrequest', component: BatchrequestComponent },
  { path: 'su', component: SuperadminComponent },
  { path: 'filling', component: FillingreqComponent },
  { path: 'rm', component: RmrequestComponent }
]



describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,

        DashboardComponent,

        PrefrenceComponent,
        BatchrequestComponent,
        SuperadminComponent,
        RmrequestComponent,
        FillingreqComponent,
        LoginComponent
      ],

      imports: [RouterTestingModule.withRoutes(appRoutes),
        NgCircleProgressModule,
        MatRadioModule,
        SnotifyModule,
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
        SnotifyModule,
        AgGridModule,
        MatAutocompleteModule



      ],

      providers: [ValidateService, AuthService, AuthGuard, {
        provide: 'SnotifyToastConfig', useValue: ToastDefaults
      }, SnotifyService]
    }).compileComponents();
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // it(`should have as title 'Angular: Getting Started'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Angular: Getting Started');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to Angular: Getting Started!!');
  // }));
});
