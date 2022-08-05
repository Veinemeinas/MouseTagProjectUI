import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Response } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import { Account } from '../models/account.model';

@Injectable()
export class AccountService {
  readonly rootUrl = 'https://localhost:7271';
  constructor(private https: HttpClient) {}
  SignUpUser(account: Account) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    //const body: Account;

    return this.https.post(
      this.rootUrl + '/api/Auth/Register',
      account,
      options
    );
  }
}
