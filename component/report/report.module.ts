import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ReportComponent } from './report.component';
import { IncomeReportComponent } from './income-report/income-report.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { AnnualReportComponent } from './annual-report/annual-report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { PipeModule } from '../../pipe/pipe.module';




import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [NativeScriptModule, NativeScriptFormsModule, NativeScriptRouterModule,
        SharedModule, PipeModule],
    declarations: [ReportComponent, IncomeReportComponent, DailyReportComponent, AnnualReportComponent, ExpenseReportComponent],
    exports: [ReportComponent, IncomeReportComponent, DailyReportComponent, AnnualReportComponent, ExpenseReportComponent]
})
export class ReportModule { }
