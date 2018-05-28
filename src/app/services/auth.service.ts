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
import { Router } from '@angular/router';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';




@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  user_id: String = localStorage.getItem('user_id');
  user_type: String = localStorage.getItem('user_type');
  user_email: String;
  project: String;
  department: String;
  host: String = "http://35.200.213.39/";
  req: any;
  permission: boolean = false;


  constructor(private http: Http,
    public router: Router,
    public flashmessage: FlashMessagesService,
    private snotify: SnotifyService,
    public snackBar: MatSnackBar

  ) {
    //this.isDev = true;  // Change to false before deployment

  }

  getspecificreq(id) {
    console.log(this.req.request_id);
    this.permission = true;
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/overview/' + id, { headers: headers })
      .map(res => res.json()).catch((err) => {

        this.snotify.error('Failed to load overview', 'Error', {
          timeout: 2000,
          position: SnotifyPosition.rightTop,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });

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
    return this.http.get('http://35.200.213.39/requests', { headers: headers })
      .map(res => res.json());
  }

  equipmentrequest(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/equipmentRequests', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        this.snackBar.open(err.statusCode + 'Failed to add equipment', 'ok', { duration: 3000 });
        return Observable.throw('')
      });
  }
  getequipments() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/equipment', { headers: headers })
      .map(res => res.json());
  }


  savefillingreq(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/fillingrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  submitfilling(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/fillingrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err);
        if (err.statusCode == 400) {
          this.snackBar.open(err.message, 'Ok', { duration: 5000 });
        }
        return Observable.throw(err)
      });
  }

  getlabs() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/formulas', { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('labs failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  gethistrory(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/history/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  getformulas(labid) {
    console.log(labid);

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/formulas/' + labid, { headers: headers })
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
    return this.http.delete('http://35.200.213.39/favourites/REQUEST_ID/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  updatecomment(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://35.200.213.39/comments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('failed to update', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }
  getcomments(id) {

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/comments/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('failed', 'Ok', { duration: 5000 });
        return Observable.throw(err)
      });
  }

  delcomment(id) {

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://35.200.213.39/comments/' + id, { headers: headers })
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
    return this.http.post('http://35.200.213.39/comments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.snackBar.open('failed to add comment', 'Ok', { duration: 5000 });
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

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/requests', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
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
    return this.http.post('http://35.200.213.39/signin', user, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
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
    return this.http.get('http://35.200.213.39/sites', { headers: headers })
      .map(res => res.json());
  }



  getreasons() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/reasons', { headers: headers })
      .map(res => res.json());
  }

  getdepartments() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/departments', { headers: headers })
      .map(res => res.json());
  }
  getprojects() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/projects', { headers: headers })
      .map(res => res.json());
  }

  getbenchs() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/benches', { headers: headers })
      .map(res => res.json());
  }



  getusers(USER) {
    console.log(USER);
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/users/' + USER, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }










  savermrequest(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/rmrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }



  makeasadmin(user) {
    console.log(user);

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);

    console.log(headers);

    return this.http.post('http://35.200.213.39/admins/grant/' + user, '', { headers: headers })
      .map(res => res.json())
  }
  removefromadmin(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/admins/revoke/' + user, '', { headers: headers })
      .map(res => res.json())
  }

  addreasons(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/reasons', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  addproject(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/projects', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  addsite(site) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/sites', site, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }




        return Observable.throw('')
      });
  }

  adddpt(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/departments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  addbench(data) {

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/benches', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });

  }

  addeqpt(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/equipment', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });

  }

  addpc(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/packagingCodes', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snackBar.open(parsed_err.message, 'ok', { duration: 3000 });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });

  }

  getfav() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/favourites/REQUEST_ID', { headers: headers })
      .map(res => res.json());
  }



  getpc() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://35.200.213.39/packagingCodes', { headers: headers })
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
    return this.http.post('http://35.200.213.39/favourites', data, { headers: headers })
      .map(res => res.json());
  }


  submitprefrences(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/prefrences', data, { headers: headers })
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
    return this.http.get('http://35.200.213.39/preferences', { headers: headers })
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
    return this.http.post('http://35.200.213.39/approvers/grant/' + USER, '', { headers: headers })
      .map(res => res.json());
  }

  removeapprover(USER) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://35.200.213.39/approvers/revoke/' + USER, '', { headers: headers })
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
