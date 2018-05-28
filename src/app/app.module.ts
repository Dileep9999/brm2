import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent, DialogOverviewExampleDialog, DialogOverview, Rmrequest } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MatSnackBarModule } from "@angular/material";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatIconModule, MatCardModule, MatSlideToggleModule, MatDividerModule } from '@angular/material'
import { MatMenuModule } from '@angular/material/menu';
import 'hammerjs';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { PrefrenceComponent } from './components/prefrence/prefrence.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToasterModule, ToasterService } from 'angular5-toaster';
import { BatchrequestComponent } from './components/batchrequest/batchrequest.component';
import { MatSelectModule } from '@angular/material/select';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from "ag-grid-angular/main";
import { RmrequestComponent } from './components/rmrequest/rmrequest.component';
import { FillingreqComponent } from './components/fillingreq/fillingreq.component';

import { LoginComponent } from './components/login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgNotifyPopup } from 'ng2-notify-popup';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';





const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'prefrence', component: PrefrenceComponent, canActivate: [AuthGuard] },
  { path: 'batchrequest', component: BatchrequestComponent, canActivate: [AuthGuard] },
  { path: 'su', component: SuperadminComponent, canActivate: [AuthGuard] },
  { path: 'filling', component: FillingreqComponent, canActivate: [AuthGuard] },
  { path: 'rm', component: RmrequestComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    DialogOverviewExampleDialog,
    DialogOverview,
    PrefrenceComponent,
    BatchrequestComponent,
    SuperadminComponent,
    RmrequestComponent,
    Rmrequest,
    FillingreqComponent,
    LoginComponent



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    ToasterModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDividerModule,
    NgNotifyPopup,
    MatInputModule,
    MatButtonModule,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    FlashMessagesModule.forRoot(),
    MatTableModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    Ng2SearchPipeModule,
    ToasterModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    }),
    MatTabsModule,
    SnotifyModule,
    AgGridModule.withComponents([HomeComponent, BatchrequestComponent]),
    MatAutocompleteModule
  ],
  entryComponents: [DialogOverviewExampleDialog, DialogOverview, Rmrequest],

  providers: [ValidateService, AuthService, AuthGuard, {
    provide: 'SnotifyToastConfig', useValue: ToastDefaults
  }, SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
