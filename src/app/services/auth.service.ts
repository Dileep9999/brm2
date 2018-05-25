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
  req: any;
  permission: boolean = false;


  constructor(private http: Http,
    public router: Router,
    public flashmessage: FlashMessagesService,
    public snackBar: MatSnackBar

  ) {
    //this.isDev = true;  // Change to false before deployment

  }

  getspecificreq() {
    console.log(this.req.request_id);
    this.permission = true;
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/overview/' + this.req.request_id, { headers: headers })
      .map(res => res.json()).catch((err) => {

        this.snackBar.open('Failed', 'ok', { duration: 3000 });

        console.log(err);
        console.log(err.statusCode);

        return Observable.throw('')
      });
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
      .map(res => res.json())
      .catch((err) => {

        this.snackBar.open('Failed', 'ok', { duration: 3000 });

        console.log(err);
        console.log(err.statusCode);

        return Observable.throw('')
      });
  }
  getequipments() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/equipment', { headers: headers })
      .map(res => res.json());
  }


  savefillingreq(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/fillingrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err);
        this.snackBar.open('failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  submitfilling(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/fillingrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  getlabs() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/fillingrequest', { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('labs failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  getformulas(labid) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/formulas/' + labid, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('labs failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  deletefav(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/favourites/REQUEST_ID/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err);

        this.snackBar.open('failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  updatecomment(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/comments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err);

        this.snackBar.open('failed to update', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }
  getcomments(id) {
    console.log(id);

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/comments/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  delcomment(id) {
    console.log(id);

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/comments/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err);

        this.snackBar.open('failed to delete', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  addcomment(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/comments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
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

  getbenchs() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/benches', { headers: headers })
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




  submitrmrequest(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/rmrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err.status);
        return Observable.throw(err)
      });
  }





  savermrequest(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/rmrequest', data, { headers: headers })
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
    return this.http.post('http://localhost:3000/reasons', data, { headers: headers })
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
    return this.http.post('http://localhost:3000/projects', data, { headers: headers })
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
    return this.http.post('http://localhost:3000/sites', site, { headers: headers })
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
    return this.http.post('http://localhost:3000/departments', data, { headers: headers })
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
    return this.http.post('http://localhost:3000/benches', data, { headers: headers })
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
    return this.http.post('http://localhost:3000/equipment', data, { headers: headers })
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
    return this.http.post('http://localhost:3000/packagingCodes', data, { headers: headers })
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

  getfav() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/favourites/REQUEST_ID', { headers: headers })
      .map(res => res.json());
  }



  getpc() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/packagingCodes', { headers: headers })
      .map(res => res.json());
  }



  addfav(num) {
    let data =
      {
        favourite_type: "REQUEST_ID",
        favourites: [num]
      }
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/favourites', data, { headers: headers })
      .map(res => res.json());
  }


  submitprefrences(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/prefrences', data, { headers: headers })
      .map(res => res.json());

  }




  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/profile', { headers: headers })
      .map(res => res.json());
  }



  getprefrences() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/preferences', { headers: headers })
      .map(res => res.json());
  }





  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


  addapprover(USER) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/approvers/grant/' + USER, '', { headers: headers })
      .map(res => res.json());
  }

  removeapprover(USER) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/approvers/revoke/' + USER, '', { headers: headers })
      .map(res => res.json());
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
