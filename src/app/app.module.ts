import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccountService } from './dashboard/services/account.service';
import { AccountLoginService } from './account/services/account-login.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './account/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './dashboard/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateTableComponent } from './candidate-table/candidate-table.component';
import { ShowCandidateComponent } from './candidate-table/show-candidate/show-candidate.component';
import { AddEditCandidateComponent } from './candidate-table/add-edit-candidate/add-edit-candidate.component';
import { CandidateTableApiService } from './services/candidate-table-api.service';

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
