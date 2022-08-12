import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountLogin } from './models/account-login.model';
import { AccountLoginService } from './services/account-login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emptyEmail: boolean = false;
  emptyPassword: boolean = false;
  accountLogin: AccountLogin = new AccountLogin();

  constructor(
    private accountLoginService: AccountLoginService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.resetForm();
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/dashboard/candidates-table');
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
    this.emptyEmail = false;
    this.emptyPassword = false;

    if (this.accountLogin.email == '') {
      this.emptyEmail = true;
    }
    if (this.accountLogin.password == '') {
      this.emptyPassword = true;
    }

    if (!this.emptyEmail && !this.emptyPassword) {
      this.accountLoginService.LoginUser(this.accountLogin).subscribe(
        (res: any) => {
          this.messageService.add({
            key: 'myKey2',
            severity: 'success',
            summary: 'Prisijungimas sėkmingas!',
            life: 3000,
          });
          const token = res.message;
          localStorage.setItem('token', token);
          this.router.navigateByUrl('dashboard/candidates-table');
        },
        (error) => {
          this.messageService.add({
            key: 'myKey2',
            severity: 'error',
            summary: 'Prisijungimas nesėkmingas!',
            life: 3000,
          });
        }
      );
    }
  }
}
