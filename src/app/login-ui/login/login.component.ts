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
  accountLogin: AccountLogin = new AccountLogin();

  constructor(
    private accountLoginService: AccountLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm();
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/dashboard');
    }
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
      .subscribe((res: any) => {
        const token = res.message;
        localStorage.setItem('token', token);
        this.router.navigateByUrl('dashboard');
      });
  }
}