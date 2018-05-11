import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { MatSnackBar } from '@angular/material';




@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  user_id: String = localStorage.getItem('user_id');
  user_type: String = localStorage.getItem('user_type');
  user_email: String;

  constructor(private http: Http,
    public flashmessage: FlashMessagesService,
    public snackBar: MatSnackBar
  ) {
    //this.isDev = true;  // Change to false before deployment

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
          this.flashmessage.show('Already Exits', { cssClass: 'alert-danger', timeout: 3000 });
        } else {
          this.flashmessage.show('Please Add site', { cssClass: 'alert-danger', timeout: 3000 });
        }
        return Observable.throw('')
      });
  }

  storeUserData(token, user_id1, user_type) {
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('user_id', user_id1);
    localStorage.setItem('id_token', token);
    this.authToken = token;

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
    return this.http.post('http://192.168.0.133:3000/signin', user, { headers: headers })
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
    return this.http.get('http://192.168.0.133:3000/sites', { headers: headers })
      .map(res => res.json());
  }



  getreasons() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://192.168.0.133:3000/reasons', { headers: headers })
      .map(res => res.json());
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
