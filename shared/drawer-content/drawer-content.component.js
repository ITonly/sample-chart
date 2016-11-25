"use strict";
var core_1 = require('@angular/core');
var page_1 = require('ui/page');
var authorization_service_1 = require('../../../service/core/authorization.service');
var base_component_1 = require('../../shared/base.component');
var UserApi_1 = require('../../../api/accounting/api/UserApi');
var loader_1 = require('../../../service/core/loader');
var DrawerContentComponent = (function (_super) {
    __extends(DrawerContentComponent, _super);
    function DrawerContentComponent(page, loaderService, authorizationService, userApi) {
        _super.call(this, page, loaderService);
        this.authorizationService = authorizationService;
        this.userApi = userApi;
        this.currentUser = {
            id: '',
            name: '',
            department: { id: '', name: '' },
            position: '',
            phoneNumber: '',
            email: '',
        };
        this.currentUser.id = this.authorizationService.session.user.id;
        this.currentCompany = this.authorizationService.session.user.currentCompany.companyName;
        this.getUserData(this.currentUser.id);
    }
    DrawerContentComponent.prototype.getUserData = function (id) {
        var _this = this;
        this.userApi.userGet(id)
            .subscribe(function (data) {
            _this.currentUser = data;
        }, function (error) {
            console.log('drawer =>', JSON.parse(error));
            _this.showError(error._body.errors[0]);
        });
    };
    DrawerContentComponent.prototype.ngOnInit = function () {
        if (this.authorizationService.session) {
            this.currentUser = this.authorizationService.session.user;
        }
    };
    DrawerContentComponent.prototype.logOut = function () {
        this.authorizationService.logout();
    };
    DrawerContentComponent = __decorate([
        core_1.Component({
            selector: 'gpm-drawer-content',
            templateUrl: './component/shared/drawer-content/drawer-content.component.html',
            styleUrls: ['./component/shared/drawer-content/drawer-content.component.css'],
            providers: [UserApi_1.UserApi]
        }), 
        __metadata('design:paramtypes', [page_1.Page, loader_1.LoaderService, authorization_service_1.AuthorizationService, UserApi_1.UserApi])
    ], DrawerContentComponent);
    return DrawerContentComponent;
}(base_component_1.BaseComponent));
exports.DrawerContentComponent = DrawerContentComponent;
