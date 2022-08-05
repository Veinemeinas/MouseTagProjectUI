import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountLogin } from '../../account/models/account-login.model';
import { AccountLoginService } from '../../account/services/account-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  accountLogin: AccountLogin;

  constructor(private accountLoginService: AccountLoginService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(userLoginForm?: NgForm) {
    if (userLoginForm != null) userLoginForm.reset();
    this.accountLogin = {
      email: '',
      password: '',
    };
  }

  onSubmit(userLoginForm: NgForm) {
    this.accountLoginService
      .LoginUser(this.accountLogin)
      .subscribe((data: any) => {
        if (data.Succeded == true) {
          this.resetForm(userLoginForm);
        }
      });
  }
}
