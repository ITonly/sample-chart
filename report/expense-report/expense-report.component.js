"use strict";
var core_1 = require('@angular/core');
var loader_1 = require('../../../service/core/loader');
var observable_array_1 = require('data/observable-array');
var ChartApi_1 = require('../../../api/accounting/api/ChartApi');
var _ = require('lodash');
var page_1 = require('ui/page');
var base_component_1 = require('../../shared/base.component');
var moment = require('moment');
var platform_1 = require('platform');
var ExpenseReportComponent = (function (_super) {
    __extends(ExpenseReportComponent, _super);
    function ExpenseReportComponent(page, loader, chartApi) {
        _super.call(this, page, loader);
        this.chartApi = chartApi;
        this.chartVisible = 'visible';
        this.startDate = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
        this.endDate = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');
    }
    ExpenseReportComponent.prototype.ngOnInit = function () {
    };
    ExpenseReportComponent.prototype.startDateChange = function (args) {
        console.log('dateChange =>' + args);
        var tempDate = new Date(moment(args).format('YYYY-MM-DD'));
        this.startDate = moment(args).format('YYYY-MM-DD');
        console.log('dateChange');
    };
    ExpenseReportComponent.prototype.endDateChange = function (args) {
        console.log('dateChange =>' + args);
        var tempDate = new Date(moment(args).format('YYYY-MM-DD'));
        this.endDate = moment(args).format('YYYY-MM-DD');
        console.log('dateChange');
        this.search();
    };
    ExpenseReportComponent.prototype.search = function () {
        var _this = this;
        if (this.startDate > this.endDate) {
            this.endDate = this.startDate;
        }
        this.chartApi.chartCurrentPeriod(this.startDate, this.endDate)
            .subscribe(function (data) {
            _this.dataSets = _.cloneDeep(data);
            for (var i = 0; i < data.series[0].length; i++) {
                _this.dataSets.xValues[i].balance = data.series[0][i];
            }
            ;
            var expenseList = _.filter(_this.dataSets.xValues, function (item) {
                var tempExpense = item;
                return (tempExpense.businessCategoryType.value === 'Outcome' && tempExpense.level === 1);
            });
            var amount = 0;
            amount = _.sumBy(expenseList, function (itemData) {
                var item = itemData;
                return item.balance;
            });
            if (amount > 0) {
                _this.setPieSource(expenseList);
                _this.chartVisible = 'visible';
            }
            else {
                _this.chartVisible = 'collapse';
            }
            _this.setListSource(expenseList, amount);
            _this.totalAmount = amount;
        }, function (error) {
            console.log('expense=>', JSON.stringify(error));
        });
    };
    ExpenseReportComponent.prototype.setPieSource = function (expenseList) {
        var arrayExpenseData = [];
        for (var i = 0; i < expenseList.length; i++) {
            arrayExpenseData.push({
                category: expenseList[i].name,
                amount: expenseList[i].balance
            });
        }
        this.pieSource = new observable_array_1.ObservableArray(arrayExpenseData);
    };
    ExpenseReportComponent.prototype.setListSource = function (expenseList, totalAmount) {
        var arrCategory = [];
        var color = ['#4FB6E7', '#A666CE', '#9DCC00', '#F9BA1A', '#F5413F', '#5977F4', '#42B571', '#B6632F', '#4FB6E7'];
        if (platform_1.isIOS) {
            color = ['#6FB6F7', '#F98D87', '#7B7B93', '#426BDB', '#7174F9', '#FBB18B', '#A6A6B3', '#955DC4', '#408FF3'];
        }
        var label = ['薪资福利', '行政支出', '差旅交通', '房租物业', '经营支出', '税费', '采购', '资金往来', '投资融资'];
        for (var i = 0; i < expenseList.length; i++) {
            arrCategory.push({
                color: color[i],
                name: label[i],
                percent: totalAmount === 0 ? 0 : expenseList[i].balance / totalAmount,
                amount: expenseList[i].balance
            });
        }
        this.categoryList = new observable_array_1.ObservableArray(arrCategory);
    };
    ExpenseReportComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.refresh(function (_) {
            _this.startDate = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
            _this.endDate = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');
            _this.search();
        });
    };
    ExpenseReportComponent = __decorate([
        core_1.Component({
            selector: 'gpm-expense-report',
            templateUrl: './component/report/expense-report/expense-report.component.html',
            styleUrls: ['./component/report/expense-report/expense-report.component.css'],
            providers: [ChartApi_1.ChartApi]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [page_1.Page, loader_1.LoaderService, ChartApi_1.ChartApi])
    ], ExpenseReportComponent);
    return ExpenseReportComponent;
}(base_component_1.BaseComponent));
exports.ExpenseReportComponent = ExpenseReportComponent;
var ExpenseData = (function () {
    function ExpenseData(category, amount) {
        this.category = category;
        this.amount = amount;
    }
    return ExpenseData;
}());
exports.ExpenseData = ExpenseData;
var Category = (function () {
    function Category(color, name, percent, amount) {
        this.color = color;
        this.name = name;
        this.percent = percent;
        this.amount = amount;
    }
    return Category;
}());
exports.Category = Category;
