import { Injectable } from '@angular/core';
import { Http, Headers, HttpModule, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

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
  host: String = 'localhost:3000';
  req: any;
  permission: boolean = false;
  equipmentload: boolean = false;


  constructor(public http: Http,
    public router: Router,

    public snotify: SnotifyService,
    public snackBar: MatSnackBar

  ) {
    // this.isDev = true;  // Change to false before deployment

  }

  getspecificreq(id) {
    console.log(this.req.request_id);
    this.permission = true;
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/overview/' + id, { headers: headers })
      .map(res => res.json()).catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          console.log(parsed_err);

          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  getallrequests() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/requests', { headers: headers })
      .map(res => res.json());
  }

  equipmentrequest(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/equipmentRequests', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        this.equipmentload = true;
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }
  getequipments() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/equipment', { headers: headers })
      .map(res => res.json());
  }


  savefillingreq(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/fillingrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          console.log(parsed_err);

          this.snotify.error(parsed_err.message.substring(13, 50), 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  submitfilling(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/fillingrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          console.log(parsed_err);
          this.snotify.warning(parsed_err.message.substring(13, 50), 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }

  getlabs() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/formulas', { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          console.log(parsed_err);

          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
  }

  gethistrory(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/history/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);


          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
  }

  getformulas(labid) {


    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/formulas/' + labid, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);


          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
  }

  deletefav(id) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://' + this.host + '/favourites/REQUEST_ID/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          console.log(parsed_err);
          this.snotify.clear();
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
  }

  updatecomment(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://' + this.host + '/comments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);


          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
  }
  getcomments(id) {

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/comments/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);

          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
  }

  delcomment(id) {

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://' + this.host + '/comments/' + id, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        try {
          const parsed_err = JSON.parse(err._body);


          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
  }

  addcomment(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/comments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          console.log(parsed_err);

          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
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
    this.project = project;
    this.department = department;
    this.router.navigate(['/filling']);

  }

  redirecttoRM(project, department) {
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
    return this.http.post('http://' + this.host + '/requests', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          console.log(parsed_err);
          this.snotify.clear();
          this.snotify.error(parsed_err.message.substring(13, 50), 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      })
  }


  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/signup', user, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.clear();
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }



  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/signin', user, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snotify.error('Something Went Wrong', 'Error', {
            timeout: 3000,
            position: SnotifyPosition.centerCenter,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.get('http://' + this.host + '/sites', { headers: headers })
      .map(res => res.json());
  }



  getreasons() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/reasons', { headers: headers })
      .map(res => res.json());
  }

  getdepartments() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/departments', { headers: headers })
      .map(res => res.json());
  }
  getprojects() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/projects', { headers: headers })
      .map(res => res.json());
  }

  getbenches() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/benches', { headers: headers })
      .map(res => res.json());
  }



  getusers(USER) {
    console.log(USER);
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/users/' + USER, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.post('http://' + this.host + '/rmrequest', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message.substring(13, 30), 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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

    return this.http.post('http://' + this.host + '/admins/grant/' + user, '', { headers: headers })
      .map(res => res.json())
  }
  removefromadmin(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/admins/revoke/' + user, '', { headers: headers })
      .map(res => res.json())
  }

  addreasons(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/reasons', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.post('http://' + this.host + '/projects', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.post('http://' + this.host + '/sites', site, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.post('http://' + this.host + '/departments', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {

        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.post('http://' + this.host + '/benches', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.post('http://' + this.host + '/equipment', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.post('http://' + this.host + '/packagingCodes', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
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
    return this.http.get('http://' + this.host + '/favourites/REQUEST_ID', { headers: headers })
      .map(res => res.json());
  }



  getpc() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/packagingCodes', { headers: headers })
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
    return this.http.post('http://' + this.host + '/favourites', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
  }


  filterssubmit(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/filterRequests', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err);

        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.error.module.substring(0, 10), 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snotify.error('Uncought error', 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        }
        return Observable.throw(err)
      });

  }

  submitprefrences(data) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/preferences', data, { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        console.log(err);

        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.error.module.substring(0, 10), 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
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



  getprefrences() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://' + this.host + '/preferences', { headers: headers })
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
    return this.http.post('http://' + this.host + '/approvers/grant/' + USER, '', { headers: headers })
      .map(res => res.json());
  }

  removeapprover(USER) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + this.host + '/approvers/revoke/' + USER, '', { headers: headers })
      .map(res => res.json())
      .catch((err) => {
        try {
          const parsed_err = JSON.parse(err._body);
          this.snotify.error(parsed_err.message, 'Error', {
            timeout: 2000,
            position: SnotifyPosition.rightTop,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        } catch (error) {
          this.snackBar.open('Unexpected', 'ok', { duration: 3000 });
        }
        return Observable.throw(err)
      });
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
