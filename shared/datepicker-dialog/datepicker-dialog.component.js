"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var dialogs_1 = require('nativescript-angular/directives/dialogs');
var dialog_content_component_1 = require('./dialog-content.component');
var moment = require('moment');
moment.locale('zh-cn');
var DATE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DatePickerDialogComponent; }), multi: true
};
var noop = function () {
};
var DatePickerDialogComponent = (function () {
    function DatePickerDialogComponent(modal, viewContainerRef) {
        this.modal = modal;
        this.viewContainerRef = viewContainerRef;
        this.dialogTitle = '请选择日期';
        this.displayFormat = 'YYYY-MM-DD';
        this.defaultDate = moment().startOf('day').toDate();
        this.minDate = new Date(1980, 1, 1);
        this.maxDate = new Date(2100, 1, 1);
        this.onSelectedDateChange = new core_1.EventEmitter();
        this.buttonText = '选择日期';
        this.selectedDate = null;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    DatePickerDialogComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (value) {
            console.log('datepicker.writevalue' + value);
            this.selectedDate = value;
            this.preDate = this.selectedDate;
            setTimeout(function () { return _this.buttonText = moment(value).format(_this.displayFormat); });
        }
        else {
            this.buttonText = this.hint;
        }
    };
    DatePickerDialogComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DatePickerDialogComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DatePickerDialogComponent.prototype.onClick = function () {
        var _this = this;
        var defaultDate = this.selectedDate ? this.selectedDate : this.defaultDate;
        var options = {
            context: {
                dialogTitle: this.dialogTitle,
                minDate: this.minDate,
                maxDate: this.maxDate,
                defaultDate: new Date(defaultDate)
            },
            fullscreen: false
        };
        this.modal.showModal(dialog_content_component_1.DialogContentComponent, options)
            .then(function (selectedDate) {
            if (selectedDate) {
                console.log('datepicker showModal=>', selectedDate);
                _this.buttonText = moment(selectedDate).format(_this.displayFormat);
                _this.onSelectedDateChange.emit(selectedDate);
                _this.selectedDate = selectedDate;
                _this.preDate = selectedDate;
            }
            else {
                console.log('datepicker selectedDate=>', selectedDate);
                console.log('datepicker preDate=>', _this.preDate);
                console.log('datepicker hint=>', _this.hint);
                if (_this.hint) {
                    _this.buttonText = _this.hint;
                }
                else {
                    _this.buttonText = moment(_this.preDate).format(_this.displayFormat);
                }
            }
        });
    };
    DatePickerDialogComponent.prototype.ngOnInit = function () {
        this.buttonText = this.hint;
    };
    DatePickerDialogComponent.entries = [
        dialog_content_component_1.DialogContentComponent
    ];
    DatePickerDialogComponent.exports = [
        dialog_content_component_1.DialogContentComponent
    ];
    __decorate([
        core_1.Input('class'), 
        __metadata('design:type', String)
    ], DatePickerDialogComponent.prototype, "buttonClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerDialogComponent.prototype, "hint", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerDialogComponent.prototype, "dialogTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatePickerDialogComponent.prototype, "displayFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerDialogComponent.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerDialogComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatePickerDialogComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatePickerDialogComponent.prototype, "onSelectedDateChange", void 0);
    DatePickerDialogComponent = __decorate([
        core_1.Component({
            selector: 'gpm-datepicker-dialog',
            templateUrl: './component/shared/datepicker-dialog/datepicker-dialog.component.html',
            providers: [dialogs_1.ModalDialogService, DATE_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [dialogs_1.ModalDialogService, core_1.ViewContainerRef])
    ], DatePickerDialogComponent);
    return DatePickerDialogComponent;
}());
exports.DatePickerDialogComponent = DatePickerDialogComponent;
