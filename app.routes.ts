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
import { TransactionComponent } from './component/transaction/transaction.component';
import { TransactionDetailComponent } from './component/transaction/detail/transaction-detail.component';
import { TransferComponent } from './component/transaction/transaction-transfer.component';

import { DepartmentComponent } from './component/settings/department/department.component';
import { ContactDetailsComponent } from './component/settings/contact/contact-details.component';
import { ContactComponent } from './component/settings/contact/contact.component';
import { CategoryComponent } from './component/settings/category/category.component';
import { DepartmentDetailsComponent } from './component/settings/department/department-details.component';
import { AccountComponent } from './component/settings/account/account.component';
import { AccountDetailComponent } from './component/settings/account/account-detail.component';
import { AddressComponent } from './component/settings/address-list/address.component';
import { PersonalInfoComponent } from './component/settings/personal-info/personal-info.component';
import { CompanyInfoComponent } from './component/settings/company-info/company-info.component';
import { CompanyListComponent } from './component/settings/company-list/company-list';
import { AboutComponent } from './component/settings/about/about.component';
import { ContactUsComponent } from './component/settings/contact-us/contact-us.component';
import { PdfviewPageComponent } from './component/shared/pdfview-page/pdfview-page.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthorizationService]
    },
    { path: 'category/:type', component: CategoryComponent },
    { path: 'contactList/:type', component: ContactComponent },
    { path: 'contact/:id', component: ContactDetailsComponent },
    { path: 'departmentList/:type', component: DepartmentComponent },
    { path: 'department/:id', component: DepartmentDetailsComponent },
    { path: 'account', component: AccountComponent },
    { path: 'account/:id', component: AccountDetailComponent },
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

    { path: 'company-list', component: CompanyListComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'setup', component: SetupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'login', component: LoginComponent },
    { path: 'transaction', component: TransactionComponent },
    { path: 'transfer/:id', component: TransferComponent },
    { path: 'transaction-detail', component: TransactionDetailComponent },
    { path: 'personalInfo', component: PersonalInfoComponent },
    { path: 'companyInfo', component: CompanyInfoComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'pdf-view/:id', component: PdfviewPageComponent },
    { path: 'address-list/:id', component: AddressComponent },
];
