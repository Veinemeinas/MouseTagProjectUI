import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Account } from './models/account.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  emptyEmail: boolean = false;
  emptyRole: boolean = false;
  emptyPassword: boolean = false;
  emptyConfirmPassword: boolean = false;
  matchPassword: boolean = false;

  account: Account;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(userRegistrationForm?: NgForm) {
    if (userRegistrationForm != null) userRegistrationForm.reset();
    this.account = {
      email: '',
      role: 'User',
      password: '',
      confirmPassword: '',
    };
  }

  onSubmit(userRegistrationForm: NgForm) {
    this.emptyEmail = false;
    this.emptyPassword = false;
    this.emptyRole = false;
    this.emptyConfirmPassword = false;
    this.matchPassword = false;

    if (this.account.email == '') {
      this.emptyEmail = true;
    }
    if (this.account.password == '') {
      this.emptyPassword = true;
    }
    if (this.account.role == '') {
      this.emptyRole = true;
    }
    if (this.account.confirmPassword == '') {
      this.emptyConfirmPassword = true;
    }

    if (
      !this.emptyPassword &&
      !this.emptyConfirmPassword &&
      this.account.password != this.account.confirmPassword
    ) {
      this.matchPassword = true;
    }

    if (
      !this.emptyEmail &&
      !this.emptyPassword &&
      !this.emptyConfirmPassword &&
      !this.emptyRole &&
      !this.matchPassword
    ) {
      this.accountService.SignUpUser(this.account).subscribe(
        (data: any) => {
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'Vartotojas sėkmingai pridėtas!',
            life: 3000,
          }),
            console.log(data);
          this.resetForm(userRegistrationForm);
        },
        (error) => {
          this.messageService.add({
            key: 'myKey1',
            severity: 'error',
            summary: 'Vartotojas nepridėtas!',
            life: 3000,
          });
        }
      );
    }
  }
}
