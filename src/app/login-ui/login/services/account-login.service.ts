import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountLogin } from '../models/account-login.model';

@Injectable({
  providedIn: 'root',
})
export class AccountLoginService {
  readonly rootUrl = 'https://localhost:7271';
  constructor(private https: HttpClient) {}

  LoginUser(account: AccountLogin) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.https.post(this.rootUrl + '/api/Auth/Login', account, options);
  }
}
