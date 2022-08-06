import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountLogin } from './models/account-login.model';
import { AccountLoginService } from './services/account-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  accountLogin: AccountLogin;

  constructor(
    private accountLoginService: AccountLoginService,
    private router: Router
  ) {}

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
    this.accountLoginService.LoginUser(this.accountLogin).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('dashboard');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
