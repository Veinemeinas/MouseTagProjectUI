import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Account } from '../models/account.model';

@Injectable()
export class AccountService {
  readonly rootUrl = 'https://localhost:7271';
  constructor(private https: HttpClient) {}
  SignUpUser(account: Account) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.https.post(
      this.rootUrl + '/api/Auth/Register',
      account,
      options
    );
  }
}
