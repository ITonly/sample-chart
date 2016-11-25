"use strict";
var core_1 = require('@angular/core');
var page_1 = require('ui/page');
var router_1 = require('@angular/router');
var angular_1 = require('nativescript-telerik-ui-pro/sidedrawer/angular');
var base_component_1 = require('../shared/base.component');
var storage_service_1 = require('../../service/core/storage.service');
var authorization_service_1 = require('../../service/core/authorization.service');
var ChartApi_1 = require('../../api/accounting/api/ChartApi');
var moment = require('moment');
var loader_1 = require('../../service/core/loader');
var router_2 = require('nativescript-angular/router');
var DashboardComponent = (function (_super) {
    __extends(DashboardComponent, _super);
    function DashboardComponent(route, routerExtensions, authorizationService, page, loader, storage, chartApi, router) {
        _super.call(this, page, loader);
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.authorizationService = authorizationService;
        this.storage = storage;
        this.chartApi = chartApi;
        this.router = router;
        this.summary = {
            income: { id: 'income', name: '0' },
            outcome: { id: 'outcome', name: '0' }
        };
        this.from = '';
        this.totalAmount = 0;
        this.navIcon = 'res://ic_menu';
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.from = this.route.snapshot.params['isWarn'];
        if (this.from !== '') {
            this.checkCompanyExpired();
        }
        var token = this.storage.getToken();
        var currentCompany = token.user.currentCompany;
        this.userId = this.authorizationService.session.user.id;
        this.actionTitle = this.authorizationService.session.user.currentCompany.companyName;
    };
    DashboardComponent.prototype.onTitleTap = function () {
        console.log('tap=>');
        this.routerExtensions.navigate(['/company-list', { id: this.userId }], {
            transition: {
                name: 'slideLeft',
            }
        });
    };
    DashboardComponent.prototype.onNavigationTap = function () {
        if (this.drawer.getIsOpen()) {
            this.drawer.closeDrawer();
        }
        else {
            this.drawer.showDrawer();
        }
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.drawer = this.drawerComponent.sideDrawer;
        this.refresh(function (_) {
            _this.initTransactionAmount();
        });
    };
    DashboardComponent.prototype.initTransactionAmount = function () {
        var _this = this;
        console.log('this.actionTitle', this.actionTitle);
        var startDate = moment([moment().year(), moment().month(), 1]);
        var endDate = startDate.clone().endOf('month');
        this.chartApi.chartIncomeOutcomeSummary(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')).subscribe(function (data) {
            console.log('chartIncomeOutcomeSummary=>', JSON.stringify(data));
            if (!data)
                return;
            _this.summary = data;
            _this.totalAmount = Number(data.income.name) - Number(data.outcome.name);
        }, function (req) {
            if (req._body && req._body.errors) {
                _this.showError(req._body.errors[0]);
            }
            else {
                _this.showError(JSON.stringify(req));
            }
        });
    };
    DashboardComponent.prototype.checkCompanyExpired = function () {
        var _this = this;
        var currentCompany = this.authorizationService.session.user.currentCompany;
        var isWarnExpired = this.authorizationService.session.isWarnExpired;
        console.log('isWarnExpired', isWarnExpired);
        if (currentCompany && currentCompany.isExpired && !isWarnExpired) {
            this.showDialog('账户已到期', ' 您可以体验app功能，但无法保存数据。\n请登录app.guanplus.com购买以获得完整服务，感谢您的支持。', '知道了')
                .then(function (req) {
                console.log('showDialog=>', req);
                _this.authorizationService.session.isWarnExpired = true;
            });
        }
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent), 
        __metadata('design:type', angular_1.RadSideDrawerComponent)
    ], DashboardComponent.prototype, "drawerComponent", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'gpm-dashboard',
            templateUrl: './component/dashboard/dashboard.component.html',
            providers: [storage_service_1.StorageService, ChartApi_1.ChartApi, authorization_service_1.AuthorizationService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_2.RouterExtensions, authorization_service_1.AuthorizationService, page_1.Page, loader_1.LoaderService, storage_service_1.StorageService, ChartApi_1.ChartApi, router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}(base_component_1.BaseComponent));
exports.DashboardComponent = DashboardComponent;
