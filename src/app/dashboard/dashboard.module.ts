import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccountService } from './sign-up/services/account.service';

import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard.component';
import { CandidateTableComponent } from './candidate-table/candidate-table.component';
import { ShowCandidateComponent } from './candidate-table/show-candidate/show-candidate.component';
import { AddEditCandidateComponent } from './candidate-table/add-edit-candidate/add-edit-candidate.component';
import { CandidateTableApiService } from './candidate-table/services/candidate-table-api.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { BodyComponent } from './body/body.component';
import { AppComponentt } from './dashboard.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { ImportPageComponent } from './import-page/import-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarComponentComponent } from './calendar-page/calendar-component/calendar-component.component';

@NgModule({
  declarations: [
    SignUpComponent,
    DashboardComponent,
    CandidateTableComponent,
    ShowCandidateComponent,
    AddEditCandidateComponent,
    NavbarComponent,
    NavbarSideComponent,
    BodyComponent,
    DashboardPageComponent,
    AccountPageComponent,
    CalendarPageComponent,
    ImportPageComponent,
    SettingsPageComponent,
    CalendarComponentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    DashboardRoutingModule,
    FormsModule,
    ListboxModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    CalendarModule,
    BrowserAnimationsModule,
    ToggleButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AccountService, CandidateTableApiService],
  bootstrap: [AppComponentt],
})
export class DashboardModule {}
