"use strict";
var Dialogs = require('ui/dialogs');
var moment = require('moment');
var platform_1 = require('platform');
var BaseComponent = (function () {
    function BaseComponent(page, loader) {
        this.page = page;
        this.loader = loader;
    }
    BaseComponent.prototype.refresh = function (_function) {
        var timeout = 400;
        if (platform_1.isIOS) {
            timeout = 0;
        }
        setTimeout(_function, 400);
    };
    BaseComponent.prototype.showError = function (errorMessage) {
        return Dialogs.alert({
            title: '错误',
            message: errorMessage,
            okButtonText: '确定'
        });
    };
    BaseComponent.prototype.ngOnDestroy = function () {
        this.enableLoader(true);
    };
    BaseComponent.prototype.enableLoader = function (value) {
        this.loader.enable(value);
    };
    BaseComponent.prototype.showDialog = function (title, message, okButtonText) {
        return Dialogs.confirm({
            title: title,
            message: message,
            okButtonText: okButtonText,
        }).then(function (result) {
            return result;
        });
    };
    BaseComponent.prototype.showOKCancelConfirm = function (title, message) {
        return Dialogs.confirm({
            title: title,
            message: message,
            okButtonText: '确定',
            cancelButtonText: '取消'
        }).then(function (result) {
            return result;
        });
    };
    BaseComponent.prototype.showCustomConfirm = function (title, message, leftBtn, rightBtn) {
        return Dialogs.confirm({
            title: title,
            message: message,
            okButtonText: leftBtn,
            cancelButtonText: rightBtn
        }).then(function (result) {
            return result;
        });
    };
    BaseComponent.prototype.showPrompt = function (title, message, okButtonText, cancelButtonText, defaultText, inputTypeString) {
        var inputType = Dialogs.inputType.text;
        return Dialogs.prompt({
            title: title,
            message: message,
            okButtonText: okButtonText,
            cancelButtonText: cancelButtonText,
            defaultText: defaultText,
            inputType: inputType
        });
    };
    BaseComponent.prototype.showPromptUpdate = function (message, defaultText) {
        var inputType = Dialogs.inputType.password;
        return this.showPrompt('', message, '确定', '取消', defaultText, '');
    };
    BaseComponent.prototype.setActionBarHidden = function (hidden) {
        this.page.actionBarHidden = hidden;
    };
    BaseComponent.prototype.getUTCDateFromString = function (value, format) {
        var utcDate = moment.utc(value, format, true);
        return utcDate.toDate();
    };
    BaseComponent.prototype.getCurrentDate = function () {
        var currentdate = moment().format('YYYY-MM-DD');
        return currentdate;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
