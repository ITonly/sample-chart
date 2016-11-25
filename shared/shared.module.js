"use strict";
var platform_1 = require('nativescript-angular/platform');
var forms_1 = require('nativescript-angular/forms');
var core_1 = require('@angular/core');
var router_1 = require('nativescript-angular/router');
var angular_1 = require('nativescript-telerik-ui-pro/chart/angular');
var angular_2 = require('nativescript-telerik-ui-pro/sidedrawer/angular');
var angular_3 = require('nativescript-telerik-ui-pro/listview/angular');
var nativescript_ng2_fonticon_1 = require('nativescript-ng2-fonticon');
var if_platform_directive_1 = require('./if-platform.directive');
var drawer_content_component_1 = require('./drawer-content/drawer-content.component');
var action_bar_component_1 = require('./action-bar/action-bar.component');
var datepicker_dialog_component_1 = require('./datepicker-dialog/datepicker-dialog.component');
var dialog_content_component_1 = require('./datepicker-dialog/dialog-content.component');
var pdfview_page_component_1 = require('./pdfview-page/pdfview-page.component');
var loader_1 = require('../../service/core/loader');
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [platform_1.NativeScriptModule, forms_1.NativeScriptFormsModule, router_1.NativeScriptRouterModule],
            entryComponents: [dialog_content_component_1.DialogContentComponent],
            declarations: [drawer_content_component_1.DrawerContentComponent, angular_2.SIDEDRAWER_DIRECTIVES, angular_3.LISTVIEW_DIRECTIVES, angular_1.CHART_DIRECTIVES,
                nativescript_ng2_fonticon_1.TNSFontIconPipe, nativescript_ng2_fonticon_1.TNSFontIconPurePipe, if_platform_directive_1.IfAndroidDirective, if_platform_directive_1.IfIosDirective, action_bar_component_1.ActionBarComponent,
                datepicker_dialog_component_1.DatePickerDialogComponent, dialog_content_component_1.DialogContentComponent, pdfview_page_component_1.PdfviewPageComponent],
            exports: [drawer_content_component_1.DrawerContentComponent, angular_2.SIDEDRAWER_DIRECTIVES, angular_3.LISTVIEW_DIRECTIVES, angular_1.CHART_DIRECTIVES,
                nativescript_ng2_fonticon_1.TNSFontIconPipe, nativescript_ng2_fonticon_1.TNSFontIconPurePipe, if_platform_directive_1.IfAndroidDirective, if_platform_directive_1.IfIosDirective, action_bar_component_1.ActionBarComponent,
                datepicker_dialog_component_1.DatePickerDialogComponent, dialog_content_component_1.DialogContentComponent, pdfview_page_component_1.PdfviewPageComponent],
            providers: [loader_1.LoaderService]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
