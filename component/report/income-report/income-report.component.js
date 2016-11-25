"use strict";
var core_1 = require('@angular/core');
var observable_array_1 = require('data/observable-array');
var loader_1 = require('../../../service/core/loader');
var ChartApi_1 = require('../../../api/accounting/api/ChartApi');
var _ = require('lodash');
var page_1 = require('ui/page');
var base_component_1 = require('../../shared/base.component');
var moment = require('moment');
var platform_1 = require('platform');
var IncomeReportComponent = (function (_super) {
    __extends(IncomeReportComponent, _super);
    function IncomeReportComponent(page, loader, chartApi) {
        _super.call(this, page, loader);
        this.chartApi = chartApi;
        this.chartVisible = 'visible';
    }
    IncomeReportComponent.prototype.ngOnInit = function () {
        this.startDate = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
        this.endDate = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');
    };
    IncomeReportComponent.prototype.startdateChange = function (args) {
        console.log('dateChange =>' + args);
        var tempDate = new Date(moment(args).format('YYYY-MM-DD'));
        this.startDate = moment(args).format('YYYY-MM-DD');
        console.log('dateChange');
        this.search();
    };
    IncomeReportComponent.prototype.enddateChange = function (args) {
        console.log('dateChange =>' + args);
        var tempDate = new Date(moment(args).format('YYYY-MM-DD'));
        this.endDate = moment(args).format('YYYY-MM-DD');
        console.log('dateChange');
        this.search();
    };
    IncomeReportComponent.prototype.search = function () {
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
            var incomeList = _.filter(_this.dataSets.xValues, function (item) {
                var tempIncome = item;
                return (tempIncome.businessCategoryType.value === 'Income' && tempIncome.level === 1);
            });
            var amount = 0;
            amount = _.sumBy(incomeList, function (itemData) {
                var item = itemData;
                return item.balance;
            });
            if (amount > 0) {
                _this.setPieSource(incomeList);
                _this.chartVisible = 'visible';
            }
            else {
                _this.chartVisible = 'collapse';
            }
            _this.setListSource(incomeList, amount);
            _this.totalAmount = amount;
        }, function (error) {
            console.log('loadchart error=>', JSON.stringify(error));
        });
    };
    IncomeReportComponent.prototype.setPieSource = function (incomeList) {
        var arrayIncomeData = [];
        for (var i = 0; i < incomeList.length; i++) {
            arrayIncomeData.push({
                category: incomeList[i].name,
                amount: incomeList[i].balance
            });
        }
        this.pieSource = new observable_array_1.ObservableArray(arrayIncomeData);
    };
    IncomeReportComponent.prototype.setListSource = function (incomeList, totalAmount) {
        var arrCategory = [];
        var color = ['#4FB6E7', '#A666CE', '#9DCC00', '#F9BA1A', '#F5413F', '#5977F4'];
        if (platform_1.isIOS) {
            color = ['#6FB6F7', '#F98D87', '#7B7B93', '#426BDB', '#7174F9', '#FBB18B'];
        }
        var label = ['商品销售', '产品销售', '服务收入', '利息收入', '资金往来', '投资融资'];
        for (var i = 0; i < incomeList.length; i++) {
            arrCategory.push({
                color: color[i],
                name: label[i],
                percent: totalAmount === 0 ? 0 : incomeList[i].balance / totalAmount,
                amount: incomeList[i].balance
            });
        }
        this.categoryList = new observable_array_1.ObservableArray(arrCategory);
    };
    IncomeReportComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.refresh(function (_) {
            _this.startDate = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
            _this.endDate = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');
            _this.search();
        });
    };
    IncomeReportComponent = __decorate([
        core_1.Component({
            selector: 'gpm-income-report',
            templateUrl: './component/report/income-report/income-report.component.html',
            styleUrls: ['./component/report/income-report/income-report.component.css'],
            providers: [ChartApi_1.ChartApi]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [page_1.Page, loader_1.LoaderService, ChartApi_1.ChartApi])
    ], IncomeReportComponent);
    return IncomeReportComponent;
}(base_component_1.BaseComponent));
exports.IncomeReportComponent = IncomeReportComponent;
var IncomeData = (function () {
    function IncomeData(category, amount) {
        this.category = category;
        this.amount = amount;
    }
    return IncomeData;
}());
exports.IncomeData = IncomeData;
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
