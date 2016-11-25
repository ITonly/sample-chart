"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var web_view_1 = require('ui/web-view');
var page_1 = require('ui/page');
var loader_1 = require('../../../service/core/loader');
var PdfviewPageComponent = (function () {
    function PdfviewPageComponent(page, actRouter, loader) {
        this.page = page;
        this.actRouter = actRouter;
        this.loader = loader;
        this.src = 'https://app.guanplus.com/assets/template/privacy.pdf';
        this.title = '隐私条款';
    }
    PdfviewPageComponent.prototype.ngOnInit = function () {
        var id = this.actRouter.snapshot.params['id'];
        if (id === 'user-agreement') {
            this.src = 'https://app.guanplus.com/assets/template/user-agreement.pdf';
            this.title = '用户协议';
        }
        var webview = this.page.getViewById('wv');
        if (this.loader) {
            var self_1 = this;
            webview.on(web_view_1.WebView.loadStartedEvent, function (args) {
                self_1.loader.show();
            });
            webview.on(web_view_1.WebView.loadFinishedEvent, function (args) {
                self_1.loader.hide();
            });
        }
        ;
    };
    PdfviewPageComponent = __decorate([
        core_1.Component({
            selector: 'gpm-pdfview-page',
            templateUrl: './component/shared/pdfview-page/pdfview-page.component.html',
            providers: [loader_1.LoaderService]
        }), 
        __metadata('design:paramtypes', [page_1.Page, router_1.ActivatedRoute, loader_1.LoaderService])
    ], PdfviewPageComponent);
    return PdfviewPageComponent;
}());
exports.PdfviewPageComponent = PdfviewPageComponent;
