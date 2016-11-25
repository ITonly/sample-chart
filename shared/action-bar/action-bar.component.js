"use strict";
var core_1 = require('@angular/core');
var platform_1 = require('platform');
var nativescript_ng2_fonticon_1 = require('nativescript-ng2-fonticon');
var router_1 = require('nativescript-angular/router');
var platform_providers_1 = require('nativescript-angular/platform-providers');
var page_1 = require('ui/page');
var router_2 = require('@angular/router');
var background_service_1 = require('../../../service/core/background.service');
var ActionBarComponent = (function () {
    function ActionBarComponent(fonticon, device, routerExtensions, backgroundService, page, router) {
        this.fonticon = fonticon;
        this.device = device;
        this.routerExtensions = routerExtensions;
        this.backgroundService = backgroundService;
        this.page = page;
        this.router = router;
        this.showNavBack = false;
        this.hideAction = false;
        this.useCustomTap = false;
        this.allowTitleClick = false;
        this.onNavTap = new core_1.EventEmitter();
        this.onTitleTap = new core_1.EventEmitter();
        this.isNoConnection = false;
        this.navIcon = 'res://ic_menu';
        this.navIconIos = 'ion-navicon';
        this.showBar = false;
    }
    ActionBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.showNavBack) {
            this.navIcon = 'res://ic_back';
            this.navIconIos = 'ion-ios-arrow-back';
        }
        else {
            this.navIcon = 'res://ic_menu';
            this.navIconIos = 'ion-navicon';
        }
        this.page.actionBarHidden = this.hideAction;
        console.log('onNavBtnTap 11111=>', this.showNavBack, this.useCustomTap);
        console.log('subscribe to connectionChange');
        this.subscription = this.backgroundService.onConnectionChanged.subscribe(function (connectionType) {
            console.log('connnection change');
            if (connectionType === 'none') {
                _this.routerExtensions.navigate(['/'], {
                    clearHistory: true,
                    transition: {
                        name: 'slideRight',
                    },
                    animated: false
                });
            }
        });
        if (platform_1.isAndroid) {
            console.log('isAndroid', platform_1.isAndroid);
            this.showBar = false;
        }
        else {
            this.showBar = true;
        }
    };
    ActionBarComponent.prototype.onNavBtnTap = function () {
        console.log('onNavBtnTap=>', this.showNavBack, this.useCustomTap);
        if (!this.showNavBack || this.useCustomTap) {
            this.onNavTap.emit();
        }
        else {
            this.routerExtensions.backToPreviousPage();
        }
    };
    ActionBarComponent.prototype.onActionTitleTap = function () {
        if (this.allowTitleClick) {
            this.onTitleTap.emit();
        }
    };
    ActionBarComponent.prototype.ngOnDestroy = function () {
        console.log('unsubscribe to connectionChange');
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Input('actionTitle'), 
        __metadata('design:type', String)
    ], ActionBarComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input('showNav'), 
        __metadata('design:type', Boolean)
    ], ActionBarComponent.prototype, "showNavBack", void 0);
    __decorate([
        core_1.Input('hide'), 
        __metadata('design:type', Boolean)
    ], ActionBarComponent.prototype, "hideAction", void 0);
    __decorate([
        core_1.Input('useCustomTap'), 
        __metadata('design:type', Boolean)
    ], ActionBarComponent.prototype, "useCustomTap", void 0);
    __decorate([
        core_1.Input('allowTitleClick'), 
        __metadata('design:type', Boolean)
    ], ActionBarComponent.prototype, "allowTitleClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionBarComponent.prototype, "onNavTap", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionBarComponent.prototype, "onTitleTap", void 0);
    ActionBarComponent = __decorate([
        core_1.Component({
            selector: 'gpm-action-bar',
            templateUrl: './component/shared/action-bar/action-bar.component.html'
        }),
        __param(1, core_1.Inject(platform_providers_1.DEVICE)), 
        __metadata('design:paramtypes', [nativescript_ng2_fonticon_1.TNSFontIconService, Object, router_1.RouterExtensions, background_service_1.BackgroundService, page_1.Page, router_2.Router])
    ], ActionBarComponent);
    return ActionBarComponent;
}());
exports.ActionBarComponent = ActionBarComponent;
