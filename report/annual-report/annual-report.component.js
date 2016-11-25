"use strict";
var core_1 = require('@angular/core');
var _ = require('lodash');
var loader_1 = require('../../../service/core/loader');
var page_1 = require('ui/page');
var base_component_1 = require('../../shared/base.component');
var ChartApi_1 = require('../../../api/accounting/api/ChartApi');
var AnnualReportComponent = (function (_super) {
    __extends(AnnualReportComponent, _super);
    function AnnualReportComponent(chartApi, page, loader) {
        _super.call(this, page, loader);
        this.chartApi = chartApi;
        this.showIncome = true;
        this.showExpense = true;
        this.showBalance = true;
        this.showTotalBalance = true;
        this.incomeIcon = 'fa-eye';
        this.expenseIcon = 'fa-eye';
        this.balanceIcon = 'fa-eye';
        this.totalbalanceIcon = 'fa-eye';
        this.year = this.getCurrentYear();
    }
    AnnualReportComponent.prototype.getCurrentYear = function () {
        var date = new Date();
        var year = date.getFullYear();
        return year;
    };
    ;
    AnnualReportComponent.prototype.ngOnInit = function () {
        this.showIncomeList = true;
        this.getEffectiveDate();
        this.search();
    };
    AnnualReportComponent.prototype.getEffectiveDate = function () {
        var _this = this;
        this.chartApi.chartGetEffectiveDate()
            .subscribe(function (data) {
            var effectiveDateStart = data[0];
            var effectiveDateEnd = data[1];
            var startYear = (new Date(effectiveDateStart)).getFullYear();
            var endYear = (new Date(effectiveDateEnd)).getFullYear();
            var temp = [startYear.toString() + '年'];
            for (var i = 0; i < endYear - startYear; i++) {
                var year = (startYear + i + 1).toString() + '年';
                temp.push(year);
            }
            _this.periodCategory = temp;
            _this.yearSelectedIndex = temp.length - 1;
        });
    };
    AnnualReportComponent.prototype.onChange = function (index) {
        this.year = parseInt(this.periodCategory[index], 10);
        this.search();
    };
    AnnualReportComponent.prototype.search = function () {
        var _this = this;
        console.log('search');
        this.chartApi.chartYearSummarizing(this.year)
            .subscribe(function (data) {
            _this.dataSets = _.cloneDeep(data);
            var temp = [];
            console.log('111', JSON.stringify(data));
            for (var i = 0; i < 12; i++) {
                temp.push({
                    month: data.xValues[i],
                    income: data.series[0][i],
                    expense: data.series[1][i],
                    balance: data.series[2][i],
                    totalBalance: data.series[3][i]
                });
            }
            _this.categoricalSource = temp;
            var testList = _this.categoricalSource;
            console.log('this._categoricalSource', JSON.stringify(temp));
        }, function (req) {
            if (req._body && req._body.errors) {
                _this.showError(req._body.errors);
            }
            else {
                _this.showError(JSON.stringify(req));
            }
        });
    };
    AnnualReportComponent.prototype.hideCertain = function () {
        var newDataSet = _.cloneDeep(this.dataSets);
        var temp = [];
        for (var i = 0; i < 12; i++) {
            temp.push({
                month: newDataSet.xValues[i],
                income: this.showIncome ? newDataSet.series[0][i] : 0,
                expense: this.showExpense ? newDataSet.series[1][i] : 0,
                balance: this.showBalance ? newDataSet.series[2][i] : 0,
                totalBalance: this.showTotalBalance ? newDataSet.series[3][i] : 0
            });
        }
        console.log('newDataSet', JSON.stringify(temp));
        this.categoricalSource = temp;
        console.log('this._categoricalSource', this.categoricalSource);
    };
    AnnualReportComponent.prototype.changeIncomeStatus = function () {
        this.showIncome = !this.showIncome;
        if (this.showIncome) {
            this.incomeIcon = 'fa-eye';
            this.hideCertain();
        }
        else {
            this.incomeIcon = 'fa-eye-slash';
            console.log('this.showIncomeListfalse', this.showIncomeList);
            this.hideCertain();
        }
    };
    AnnualReportComponent.prototype.changeExpenseStatus = function () {
        this.showExpense = !this.showExpense;
        if (this.showExpense) {
            this.expenseIcon = 'fa-eye';
            this.hideCertain();
        }
        else {
            this.expenseIcon = 'fa-eye-slash';
            this.hideCertain();
        }
    };
    AnnualReportComponent.prototype.changeBalanceStatus = function () {
        this.showBalance = !this.showBalance;
        if (this.showBalance) {
            this.balanceIcon = 'fa-eye';
            this.hideCertain();
        }
        else {
            this.balanceIcon = 'fa-eye-slash';
            this.hideCertain();
        }
    };
    AnnualReportComponent.prototype.changeTotalBalanceStatus = function () {
        this.showTotalBalance = !this.showTotalBalance;
        if (this.showTotalBalance) {
            this.totalbalanceIcon = 'fa-eye';
            this.hideCertain();
        }
        else {
            this.totalbalanceIcon = 'fa-eye-slash';
            this.hideCertain();
        }
    };
    AnnualReportComponent = __decorate([
        core_1.Component({
            selector: 'gpm-annual-report',
            templateUrl: './component/report/annual-report/annual-report.component.html',
            styleUrls: ['./component/report/annual-report/annual-report.component.css'],
            providers: [ChartApi_1.ChartApi]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ChartApi_1.ChartApi, page_1.Page, loader_1.LoaderService])
    ], AnnualReportComponent);
    return AnnualReportComponent;
}(base_component_1.BaseComponent));
exports.AnnualReportComponent = AnnualReportComponent;
