"use strict";
var core_1 = require('@angular/core');
var platform_1 = require('nativescript-angular/platform');
var forms_1 = require('nativescript-angular/forms');
var router_1 = require('nativescript-angular/router');
var dashboard_component_1 = require('./dashboard.component');
var navigation_component_1 = require('./navigation/navigation.component');
var summary_component_1 = require('./summary/summary.component');
var shared_module_1 = require('../shared/shared.module');
var pipe_module_1 = require('../../pipe/pipe.module');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [platform_1.NativeScriptModule, forms_1.NativeScriptFormsModule, router_1.NativeScriptRouterModule,
                shared_module_1.SharedModule, pipe_module_1.PipeModule],
            declarations: [dashboard_component_1.DashboardComponent, navigation_component_1.NavigationComponent, summary_component_1.SummaryComponent],
            exports: [dashboard_component_1.DashboardComponent, navigation_component_1.NavigationComponent, summary_component_1.SummaryComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
