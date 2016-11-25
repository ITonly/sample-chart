import {
    Component, OnInit, Input, Output, EventEmitter, ViewContainerRef,
    forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as dialogs from 'ui/dialogs';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { DialogContentComponent } from './dialog-content.component';
import * as moment from 'moment';

moment.locale('zh-cn');
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerDialogComponent), multi: true
};

const noop = () => {
};


@Component({
    selector: 'gpm-datepicker-dialog',
    templateUrl: './component/shared/datepicker-dialog/datepicker-dialog.component.html',
    providers: [ModalDialogService, DATE_VALUE_ACCESSOR]
})
export class DatePickerDialogComponent implements OnInit, ControlValueAccessor {
    static entries = [
        DialogContentComponent
    ];

    static exports = [
        DialogContentComponent
    ];
    @Input('class') public buttonClass: string;
    @Input() public hint: string;


    @Input() public dialogTitle: string = '请选择日期';
    @Input() public displayFormat: string = 'YYYY-MM-DD';
    @Input() public defaultDate: Date = moment().startOf('day').toDate();
    @Input() public minDate: Date = new Date(1980, 1, 1);
    @Input() public maxDate: Date = new Date(2100, 1, 1);
    @Output() public onSelectedDateChange: EventEmitter<Date> = new EventEmitter<Date>();

    public buttonText: string = '选择日期';
    public selectedDate: Date = null;
    preDate: any;

    // Placeholders for the callbacks which are later providesd
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(private modal: ModalDialogService,
        private viewContainerRef: ViewContainerRef) {

    }

    public writeValue(value: any) {
        if (value) {
            console.log('datepicker.writevalue' + value);
            this.selectedDate = value;
            this.preDate = this.selectedDate;
            // 2016/11/01
            setTimeout(() => this.buttonText = moment(value).format(this.displayFormat));

        } else {
            this.buttonText = this.hint;
        }
    }
    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public onClick() {
        let defaultDate = this.selectedDate ? this.selectedDate : this.defaultDate;
        let options: ModalDialogOptions = {
            context: {
                dialogTitle: this.dialogTitle,
                minDate: this.minDate,
                maxDate: this.maxDate,
                defaultDate: new Date(defaultDate)// this.defaultDate//
            },
            fullscreen: false
        };

        this.modal.showModal(DialogContentComponent, options)
            .then((selectedDate: Date) => {
                if (selectedDate) {
                    console.log('datepicker showModal=>', selectedDate);
                    this.buttonText = moment(selectedDate).format(this.displayFormat);
                    this.onSelectedDateChange.emit(selectedDate);
                    this.selectedDate = selectedDate;
                    this.preDate = selectedDate;
                } else {
                    console.log('datepicker selectedDate=>', selectedDate);
                    console.log('datepicker preDate=>', this.preDate);
                    console.log('datepicker hint=>', this.hint);
                    // this.buttonText = this.hint;
                    if (this.hint) {
                        this.buttonText = this.hint;
                    } else {
                        this.buttonText = moment(this.preDate).format(this.displayFormat);
                    }
                }
            });
    }

    ngOnInit() {
        this.buttonText = this.hint;
    }
}
