"use strict";
var core_1 = require('@angular/core');
var route_state_service_1 = require('../../../service/core/route-state-service');
var router_1 = require('@angular/router');
var router_2 = require('nativescript-angular/router');
var NavigationComponent = (function () {
    function NavigationComponent(routerExtensions, router, routeStateService) {
        this.routerExtensions = routerExtensions;
        this.router = router;
        this.routeStateService = routeStateService;
        this.isAddClick = false;
        this.addFabVisiblity = 'collapse';
        this.ionIcon = 'ion-plus-circled';
        this.ionColor = 'ion fab fab-default';
    }
    NavigationComponent.prototype.fabDefaultTap = function () {
        console.log('fab tap');
        this.toggleFab();
    };
    NavigationComponent.prototype.toggleFab = function () {
        this.isAddClick = !this.isAddClick;
        if (this.isAddClick) {
            this.addFabVisiblity = 'visible';
            this.ionIcon = 'ion-close-circled';
            this.ionColor = 'ion fab fab-primary';
        }
        else {
            this.addFabVisiblity = 'collapse';
            this.ionIcon = 'ion-plus-circled';
            this.ionColor = 'ion fab fab-default';
        }
    };
    NavigationComponent.prototype.routeLink = function (args) {
        this.routeStateService.clear();
        if (args === 'Income') {
            this.routerExtensions.navigate(['/transaction-detail', { id: 'Income' }], {
                transition: {
                    name: 'slideRight',
                }
            });
        }
        else if (args === 'Outcome') {
            this.routerExtensions.navigate(['/transaction-detail', { id: 'Outcome' }], {
                transition: {
                    name: 'slideRight',
                }
            });
        }
        else {
            this.routerExtensions.navigate(['/transfer/transferId'], {
                transition: {
                    name: 'slideRight',
                }
            });
        }
    };
    NavigationComponent.prototype.ngOnInit = function () {
        this.items = [
            { id: 1, name: '收支列表', path: '/transaction', icon: '~/images/ic_trans_list.png' },
            { id: 2, name: ' 账户', path: '/account', icon: '~/images/ic_account.png' },
            { id: 3, name: '报表', path: '/report-income', icon: '~/images/ic_chart.png' },
            { id: 4, name: '部门信息', path: '/departmentList/dashboard', icon: '~/images/ic_department.png' },
            { id: 5, name: '收支类别', path: '/category/dashboard', icon: '~/images/ic_trans_category.png' },
            { id: 6, name: '往来信息', path: '/contactList/dashboard', icon: '~/images/ic_contacts.png' }
        ];
    };
    NavigationComponent = __decorate([
        core_1.Component({
            selector: '[gpm-dashboard-navigation]',
            templateUrl: './component/dashboard/navigation/navigation.component.html',
            styleUrls: ['./component/dashboard/navigation/navigation.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [router_2.RouterExtensions, router_1.Router, route_state_service_1.RouteStateService])
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
