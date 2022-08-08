import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SignUpComponent } from '../dashboard/sign-up/sign-up.component';
import { CandidateTableComponent } from './candidate-table/candidate-table.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/auth.guard';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { ImportPageComponent } from './import-page/import-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'candidates-table', component: DashboardPageComponent },
      { path: 'profile', component: AccountPageComponent },
      { path: 'calendar', component: CalendarPageComponent },
      { path: 'import', component: ImportPageComponent },
      { path: 'settings', component: SettingsPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
