import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountLogin } from '../models/account-login.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AccountLoginService {
  readonly rootUrl = 'https://localhost:7271';
  constructor(private https: HttpClient, private jwtHelper: JwtHelperService) {}

  LoginUser(account: AccountLogin) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.https.post(this.rootUrl + '/api/Auth/Login', account, options);
  }

  getUserProfile() {
    var token = JSON.stringify(localStorage.getItem('token'));
    console.log(this.jwtHelper.decodeToken(token));
    const tokendec = this.jwtHelper.decodeToken(token);
    const email = tokendec['Email'];
    return email;
  }
}
