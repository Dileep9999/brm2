import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/of";
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router'




@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  user_id: String = localStorage.getItem('user_id');
  user_type: String = localStorage.getItem('user_type');
  user_email: String;
  project: String;
  department: String;
  host: String = "http://localhost:3000/";

  public getEvents(): Observable<any> {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    let data: any = [{
      title: 'All Day Event',
      start: yearMonth + '-01'
    },
    {
      title: 'Long Event',
      start: yearMonth + '-07',
      end: yearMonth + '-10'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: yearMonth + '-09T16:00:00'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: yearMonth + '-16T16:00:00'
    },
    {
      title: 'Conference',
      start: yearMonth + '-11',
      end: yearMonth + '-13'
    },
    {
      title: 'Meeting',
      start: yearMonth + '-12T10:30:00',
      end: yearMonth + '-12T12:30:00'
    },
    {
      title: 'Lunch',
      start: yearMonth + '-12T12:00:00'
    },
    {
      title: 'Meeting',
      start: yearMonth + '-12T14:30:00'
    },
    {
      title: 'Happy Hour',
      start: yearMonth + '-12T17:30:00'
    },
    {
      title: 'Dinner',
      start: yearMonth + '-12T20:00:00'
    },
    {
      title: 'Birthday Party',
      start: yearMonth + '-13T07:00:00'
    },
    {
      title: 'Click for Google',
      url: 'http://google.com/',
      start: yearMonth + '-17'
    }];
    return Observable.of(data);
  }

  constructor(private http: Http,
    public router: Router,
    public flashmessage: FlashMessagesService,
    public snackBar: MatSnackBar

  ) {
    //this.isDev = true;  // Change to false before deployment

  }


  getallrequests() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/requests', { headers: headers })
      .map(res => res.json());
  }

  equipmentrequest(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/equipmentRequests', data, { headers: headers })
      .map(res => res.json());
  }




  storeUserData(token, user_id1, user_type) {
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('user_id', user_id1);
    localStorage.setItem('id_token', token);
    this.authToken = token;

  }
  redirecttobatch(project, department) {
    this.project = project;
    this.department = department;
    this.router.navigate(['/batchrequest']);

  }
  redirecttofilling(project, department) {
    console.log('redirect');

    this.project = project;
    this.department = department;
    this.router.navigate(['/filling']);

  }

  redirecttoRM(project, department) {
    console.log('redirect');

    this.project = project;
    this.department = department;
    this.router.navigate(['/rm']);

  }




  submitnewreq(requesttype) {

    let data = {
      request_type: requesttype,
      project: this.project,
      department: this.department
    }
    console.log(data);

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/requests', data, { headers: headers })
      .map(res => res.json());
  }


  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/register', user, { headers: headers })
      .map(res => res.json());
  }



  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/signin', user, { headers: headers })
      .map(res => res.json());
  }



  getUserdata(email, id, type) {
    this.user_email = email;
    this.user_id = id;
    this.user_type = type;
  }




  getsites() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/sites', { headers: headers })
      .map(res => res.json());
  }



  getreasons() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/reasons', { headers: headers })
      .map(res => res.json());
  }

  getdepartments() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/departments', { headers: headers })
      .map(res => res.json());
  }
  getprojects() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/projects', { headers: headers })
      .map(res => res.json());
  }

  getusers(USER) {
    console.log(USER);
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/' + USER, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err.status);

        return Observable.throw(err)
      });
  }

  makeasadmin(user) {
    console.log(user);

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);

    console.log(headers);

    return this.http.post('http://localhost:3000/admins/grant/' + user, '', { headers: headers })
      .map(res => res.json())
  }
  removefromadmin(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/admins/revoke/' + user, '', { headers: headers })
      .map(res => res.json())
  }

  addreasons(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://192.168.0.133:3000/reasons', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        if (err.status === 409) {
          this.snackBar.open('Already Exits', 'ok', { duration: 3000 });
        } else {
          this.snackBar.open('Please add all fields', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  addproject(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://192.168.0.133:3000/projects', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        if (err.status === 409) {
          this.snackBar.open('Already Exits', 'ok', { duration: 3000 });
        } else {
          this.snackBar.open('Please add all fields', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  addsite(site) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://192.168.0.133:3000/sites', site, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        if (err.status === 409) {
          this.snackBar.open('Already Exits', 'ok', { duration: 3000 });
        } else {
          this.snackBar.open('Please Add site', 'ok', { duration: 3000 });
        }
        return Observable.throw('')
      });
  }

  adddpt(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://192.168.0.133:3000/departments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        if (err.status === 409) {
          this.snackBar.open('Already Exits', 'ok', { duration: 3000 });
        } else {
          this.snackBar.open('Please add all fields', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  addbench(data) {

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://192.168.0.133:3000/benches', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        if (err.status === 409) {
          this.snackBar.open('Already Exits', 'ok', { duration: 3000 });
        } else {
          this.snackBar.open('Please add all fields', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });

  }

  addeqpt(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://192.168.0.133:3000/equipment', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        if (err.status === 409) {
          this.snackBar.open('Already Exits', 'ok', { duration: 3000 });
        } else {
          this.snackBar.open('Please add all fields', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });

  }

  addpc(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://192.168.0.133:3000/packagingCodes', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        if (err.status === 409) {
          this.snackBar.open('Already Exits', 'ok', { duration: 3000 });
        } else {
          this.snackBar.open('Please add all fields', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });

  }







  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/profile', { headers: headers })
      .map(res => res.json());
  }





  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }




  loggedIn() {
    return tokenNotExpired('id_token');
  }



  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}
