"use strict";
var core_1 = require('@angular/core');
var moment = require('moment');
var SummaryComponent = (function () {
    function SummaryComponent() {
        this.totalAmount = 0;
        this.month = this.getCurrentMonth();
        this.isShow = true;
        this.eyeIcon = 'fa-eye';
    }
    SummaryComponent.prototype.getCurrentMonth = function () {
        return '' + (moment().month() + 1);
    };
    SummaryComponent.prototype.changeAmountStatus = function () {
        this.isShow = !this.isShow;
        if (this.isShow) {
            this.eyeIcon = 'fa-eye';
        }
        else {
            this.eyeIcon = 'fa-eye-slash';
        }
    };
    __decorate([
        core_1.Input('summary'), 
        __metadata('design:type', Object)
    ], SummaryComponent.prototype, "summaryModel", void 0);
    __decorate([
        core_1.Input('total'), 
        __metadata('design:type', Number)
    ], SummaryComponent.prototype, "totalAmount", void 0);
    SummaryComponent = __decorate([
        core_1.Component({
            selector: '[gpm-dashboard-summary]',
            templateUrl: './component/dashboard/summary/summary.component.html',
            styleUrls: ['./component/dashboard/summary/summary.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], SummaryComponent);
    return SummaryComponent;
}());
exports.SummaryComponent = SummaryComponent;
