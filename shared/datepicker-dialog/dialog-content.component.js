"use strict";
var core_1 = require('@angular/core');
var dialogs_1 = require('nativescript-angular/directives/dialogs');
var page_1 = require('ui/page');
var DialogContentComponent = (function () {
    function DialogContentComponent(page, params) {
        this.page = page;
        this.params = params;
        var context = this.params.context;
        this.page.width = 500;
        this.page.height = 500;
        console.log('DialogContentComponent =>', JSON.stringify(context));
        if (context.dialogTitle) {
            this.dialogTitle = context.dialogTitle;
        }
    }
    DialogContentComponent.prototype.close = function () {
        this.params.closeCallback('');
    };
    DialogContentComponent.prototype.configure = function (datePicker) {
        var context = this.params.context;
        if (context.minDate) {
            datePicker.minDate = context.minDate;
        }
        if (context.maxDate) {
            datePicker.maxDate = context.maxDate;
        }
        if (context.defaultDate) {
            datePicker.date = context.defaultDate;
        }
    };
    DialogContentComponent.prototype.okay = function () {
        this.params.closeCallback(this.datePicker.date);
    };
    DialogContentComponent.prototype.ngOnInit = function () {
    };
    DialogContentComponent.prototype.ngAfterViewInit = function () {
        this.datePicker = this.datePickerElement.nativeElement;
    };
    __decorate([
        core_1.ViewChild('datePickerElement'), 
        __metadata('design:type', core_1.ElementRef)
    ], DialogContentComponent.prototype, "datePickerElement", void 0);
    DialogContentComponent = __decorate([
        core_1.Component({
            selector: 'gpm-datepicker-dialog-content',
            templateUrl: './component/shared/datepicker-dialog/dialog-content.component.html',
            styleUrls: ['./component/shared/datepicker-dialog/dialog-content.component.css']
        }), 
        __metadata('design:paramtypes', [page_1.Page, dialogs_1.ModalDialogParams])
    ], DialogContentComponent);
    return DialogContentComponent;
}());
exports.DialogContentComponent = DialogContentComponent;
