"use strict";
var core_1 = require('@angular/core');
var platform_1 = require('nativescript-angular/platform');
var forms_1 = require('nativescript-angular/forms');
var router_1 = require('nativescript-angular/router');
var report_component_1 = require('./report.component');
var income_report_component_1 = require('./income-report/income-report.component');
var daily_report_component_1 = require('./daily-report/daily-report.component');
var annual_report_component_1 = require('./annual-report/annual-report.component');
var expense_report_component_1 = require('./expense-report/expense-report.component');
var pipe_module_1 = require('../../pipe/pipe.module');
var shared_module_1 = require('../shared/shared.module');
var ReportModule = (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        core_1.NgModule({
            imports: [platform_1.NativeScriptModule, forms_1.NativeScriptFormsModule, router_1.NativeScriptRouterModule,
                shared_module_1.SharedModule, pipe_module_1.PipeModule],
            declarations: [report_component_1.ReportComponent, income_report_component_1.IncomeReportComponent, daily_report_component_1.DailyReportComponent, annual_report_component_1.AnnualReportComponent, expense_report_component_1.ExpenseReportComponent],
            exports: [report_component_1.ReportComponent, income_report_component_1.IncomeReportComponent, daily_report_component_1.DailyReportComponent, annual_report_component_1.AnnualReportComponent, expense_report_component_1.ExpenseReportComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ReportModule);
    return ReportModule;
}());
exports.ReportModule = ReportModule;
