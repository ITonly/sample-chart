import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AuthorizationService } from './service/core/authorization.service';
import { LoginComponent } from './component/external/login/login.component';
import { ForgotPasswordComponent } from './component/external/forgot-password/forgot-password.component';
import { RegisterComponent } from './component/external/register/register.component';
import { SetupComponent } from './component/external/setup/setup.component';
import { LandingComponent } from './component/external/landing/landing.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { ReportComponent } from './component/report/report.component';
import { IncomeReportComponent } from './component/report/income-report/income-report.component';
import { ExpenseReportComponent } from './component/report/expense-report/expense-report.component';
import { DailyReportComponent } from './component/report/daily-report/daily-report.component';
import { AnnualReportComponent } from './component/report/annual-report/annual-report.component';
// import { StatementComponent } from './component/statement/statement.component';


export const routes: Routes = [
    { path: '', component: LandingComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthorizationService]
    },
    
    {
        path: 'report-income', component: ReportComponent,
        children:
        [
            {
                path: '',
                component: IncomeReportComponent
            }
        ]
    },
    {
        path: 'report-expense', component: ReportComponent,
        children:
        [
            {
                path: '',
                component: ExpenseReportComponent
            }
        ]
    },
    {
        path: 'report-daily', component: ReportComponent,
        children:
        [
            {
                path: '',
                component: DailyReportComponent
            }
        ]
    },
    {
        path: 'report-annual', component: ReportComponent,
        children:
        [
            {
                path: '',
                component: AnnualReportComponent
            }
        ]
    },
    // { path: 'statement', component: StatementComponent },

    
];
