import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SignUpComponent } from '../dashboard/sign-up/sign-up.component';
import { CandidateTableComponent } from './candidate-table/candidate-table.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'candidates', component: CandidateTableComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
