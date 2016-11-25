"use strict";
var core_1 = require('@angular/core');
var observable_array_1 = require('data/observable-array');
var loader_1 = require('../../service/core/loader');
var router_1 = require('@angular/router');
var router_2 = require('nativescript-angular/router');
var page_1 = require('ui/page');
var base_component_1 = require('../shared/base.component');
var ReportComponent = (function (_super) {
    __extends(ReportComponent, _super);
    function ReportComponent(page, loader, router, routerExt) {
        _super.call(this, page, loader);
        this.router = router;
        this.routerExt = routerExt;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var list = [
            { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: true, url: '/report-daily' },
            { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-income' },
            { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-expense' },
            { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: false, url: '/report-annual' }
        ];
        if (this.router.url === '/report-expense') {
            list = [
                { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: false, url: '/report-daily' },
                { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-income' },
                { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: true, url: '/report-expense' },
                { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: false, url: '/report-annual' }
            ];
        }
        if (this.router.url === '/report-income') {
            list = [
                { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: false, url: '/report-daily' },
                { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: true, url: '/report-income' },
                { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-expense' },
                { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: false, url: '/report-annual' }
            ];
        }
        if (this.router.url === '/report-annual') {
            list = [
                { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: false, url: '/report-daily' },
                { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-income' },
                { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-expense' },
                { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: true, url: '/report-annual' }
            ];
        }
        console.log(this.router.url);
        this.dataItems = new observable_array_1.ObservableArray(list);
    };
    ReportComponent.prototype.onItemTap = function (selectedItem) {
        this.routerExt.navigate([selectedItem.url], {
            clearHistory: true,
            animated: false
        });
    };
    ReportComponent.prototype.onNavBtnTap = function () {
        this.routerExt.navigate(['/dashboard'], {
            transition: {
                name: 'slideRight',
            }
        });
    };
    ReportComponent = __decorate([
        core_1.Component({
            selector: 'gpm-report',
            templateUrl: './component/report/report.component.html',
            styleUrls: ['./component/report/report.component.css']
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [page_1.Page, loader_1.LoaderService, router_1.Router, router_2.RouterExtensions])
    ], ReportComponent);
    return ReportComponent;
}(base_component_1.BaseComponent));
exports.ReportComponent = ReportComponent;
