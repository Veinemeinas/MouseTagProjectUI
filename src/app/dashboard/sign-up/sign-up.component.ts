import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from '../../dashboard/shared/account.model';
import { AccountService } from '../../dashboard/shared/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  account: Account;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.reset();
    this.account = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onSubmit(userRegistrationForm: NgForm) {
    this.accountService.SignUpUser(this.account).subscribe((data: any) => {
      if (data.Succeded == true) {
        this.resetForm(userRegistrationForm);
      }
    });
  }
}
