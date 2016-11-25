import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DatePicker } from 'ui/date-picker';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { Page } from 'ui/page';

@Component({
    selector: 'gpm-datepicker-dialog-content',
    templateUrl: './component/shared/datepicker-dialog/dialog-content.component.html',
    styleUrls: ['./component/shared/datepicker-dialog/dialog-content.component.css']
})
export class DialogContentComponent implements OnInit, AfterViewInit {
    @ViewChild('datePickerElement')
    public datePickerElement: ElementRef;

    dialogTitle: string;
    datePicker: DatePicker;

    constructor(private page: Page, private params: ModalDialogParams) {
        let context = this.params.context;

        this.page.width = 500;
        this.page.height = 500;

        console.log('DialogContentComponent =>', JSON.stringify(context));
        if (context.dialogTitle) {
            this.dialogTitle = context.dialogTitle;
        }
    }

    public close() {
        this.params.closeCallback('');
    }

    configure(datePicker: DatePicker) {
        let context = this.params.context;
        if (context.minDate) {
            datePicker.minDate = context.minDate;
        }

        if (context.maxDate) {
            datePicker.maxDate = context.maxDate;
        }

        if (context.defaultDate) {
            datePicker.date = context.defaultDate;
        }
    }

    public okay() {
        this.params.closeCallback(this.datePicker.date);
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.datePicker = this.datePickerElement.nativeElement;
    }
}
