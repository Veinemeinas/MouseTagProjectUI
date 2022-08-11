import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  email = this.getUserProfileMail();
  role = this.getUserProfileRole();

  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {}

  getUserProfileMail() {
    var token = JSON.stringify(localStorage.getItem('token'));
    console.log(this.jwtHelper.decodeToken(token));
    const tokendec = this.jwtHelper.decodeToken(token);
    const email = tokendec['Email'];
    return email;
  }

  getUserProfileRole() {
    var token = JSON.stringify(localStorage.getItem('token'));
    console.log(this.jwtHelper.decodeToken(token));
    const tokendec = this.jwtHelper.decodeToken(token);
    const role =
      tokendec['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role;
  }
}
