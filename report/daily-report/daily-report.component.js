"use strict";
var core_1 = require('@angular/core');
var observable_array_1 = require('data/observable-array');
var loader_1 = require('../../../service/core/loader');
var page_1 = require('ui/page');
var base_component_1 = require('../../shared/base.component');
var ChartApi_1 = require('../../../api/accounting/api/ChartApi');
var moment = require('moment');
moment.locale('zh-cn');
var DailyReportComponent = (function (_super) {
    __extends(DailyReportComponent, _super);
    function DailyReportComponent(page, loader, chartApi) {
        _super.call(this, page, loader);
        this.chartApi = chartApi;
        this.dayDate = null;
        this.todayDate = null;
    }
    Object.defineProperty(DailyReportComponent.prototype, "categoricalSource", {
        get: function () {
            return this._categoricalSource;
        },
        enumerable: true,
        configurable: true
    });
    DailyReportComponent.prototype.ngOnInit = function () {
        this.getCurrentDate();
        this.search();
    };
    DailyReportComponent.prototype.getCurrentDate = function () {
        this.todayDate = moment().format('YYYY/MM/DD');
        console.log('this.todayDate', this.todayDate);
    };
    ;
    DailyReportComponent.prototype.dateChange = function (args) {
        console.log('dateChange =>' + args);
        this.todayDate = moment(args).format('YYYY-MM-DD');
        console.log('tempDate', this.todayDate);
        console.log('dateChange');
        this.search();
    };
    DailyReportComponent.prototype.search = function () {
        var _this = this;
        this.chartApi.chartDaySummarizing(this.todayDate)
            .subscribe(function (data) {
            var tempdata = ['昨日结余', '本日收入', '本日支出', '本日结余'];
            console.log('data', JSON.stringify(data));
            var temp = [];
            console.log('111', JSON.stringify(data));
            for (var i = 0; i < 4; i++) {
                temp.push({
                    items: tempdata[i] + '\n' + data.series[i][0],
                    amount: data.series[i][0]
                });
            }
            console.log('this.temp', JSON.stringify(temp));
            _this._categoricalSource = new observable_array_1.ObservableArray(temp);
        });
    };
    DailyReportComponent = __decorate([
        core_1.Component({
            selector: 'gpm-daily-report',
            templateUrl: './component/report/daily-report/daily-report.component.html',
            styleUrls: ['./component/report/daily-report/daily-report.component.css'],
            providers: [ChartApi_1.ChartApi]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [page_1.Page, loader_1.LoaderService, ChartApi_1.ChartApi])
    ], DailyReportComponent);
    return DailyReportComponent;
}(base_component_1.BaseComponent));
exports.DailyReportComponent = DailyReportComponent;
var TodayData = (function () {
    function TodayData(items, amount) {
        this.items = items;
        this.amount = amount;
    }
    return TodayData;
}());
exports.TodayData = TodayData;
