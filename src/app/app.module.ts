import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccountService } from './dashboard/sign-up/services/account.service';
import { AccountLoginService } from './login-ui/login/services/account-login.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login-ui/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './dashboard/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateTableComponent } from './dashboard/candidate-table/candidate-table.component';
import { ShowCandidateComponent } from './dashboard/candidate-table/show-candidate/show-candidate.component';
import { AddEditCandidateComponent } from './dashboard/candidate-table/add-edit-candidate/add-edit-candidate.component';
import { CandidateTableApiService } from './dashboard/candidate-table/services/candidate-table-api.service';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { NavbarSideComponent } from './dashboard/navbar-side/navbar-side.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    SignUpComponent,
    DashboardComponent,
    CandidateTableComponent,
    ShowCandidateComponent,
    AddEditCandidateComponent,
    NavbarComponent,
    NavbarSideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AccountService, AccountLoginService, CandidateTableApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
