import { TestBed, async, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Http, Headers, HttpModule, ResponseContentType } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SnotifyModule, SnotifyService, ToastDefaults, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { MatSnackBarModule } from "@angular/material";

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, {
        provide: 'SnotifyToastConfig', useValue: ToastDefaults
      }, SnotifyService],
      imports: [HttpClientTestingModule, HttpModule, RouterTestingModule, MatSnackBarModule],
    });
  });

  it('should be created', inject([AuthService], (httpClient: HttpTestingController, service: AuthService) => {
    // expect(service).toBeTruthy();
  }));
});

