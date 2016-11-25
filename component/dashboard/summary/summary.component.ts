import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Page } from 'ui/page';
import { IncomeOutcomeSummaryModel } from '../../../api/accounting/model/IncomeOutcomeSummaryModel';
import * as moment from 'moment';

@Component({
    selector: '[gpm-dashboard-summary]',
    templateUrl: './component/dashboard/summary/summary.component.html',
    styleUrls: ['./component/dashboard/summary/summary.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
    @Input('summary') public summaryModel: IncomeOutcomeSummaryModel;
    @Input('total') public totalAmount: number = 0;
    month: string = this.getCurrentMonth();
    isShow: boolean = true;
    eyeIcon: string = 'fa-eye';

    constructor() {
    }

    public getCurrentMonth() {
        return '' + (moment().month() + 1);
    }

    public changeAmountStatus() {
        this.isShow = !this.isShow;
        if (this.isShow) {
            this.eyeIcon = 'fa-eye';
        } else {
            this.eyeIcon = 'fa-eye-slash';
        }
    }
}
