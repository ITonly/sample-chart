import {
    Component, ElementRef, ViewChild,
    Injectable, OnInit, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { ObservableArray } from 'data/observable-array';
import * as _ from 'lodash';
import { LoaderService } from '../../../service/core/loader';

import { Page } from 'ui/page';
import { BaseComponent } from '../../shared/base.component';
import { ChartApi } from '../../../api/accounting/api/ChartApi';

@Component({
    selector: 'gpm-annual-report',
    templateUrl: './component/report/annual-report/annual-report.component.html',
    styleUrls: ['./component/report/annual-report/annual-report.component.css'],
    providers: [ChartApi]
})

@Injectable()
export class AnnualReportComponent extends BaseComponent implements OnInit {
    categoricalSource;
    showIncome: boolean = true;
    showExpense: boolean = true;
    showBalance: boolean = true;
    showTotalBalance: boolean = true;
    showIncomeList: boolean;
    showExpenseList: boolean;
    showBalanceList: boolean;
    showTotalBalanceList: boolean;

    incomeIcon: string = 'fa-eye';
    expenseIcon: string = 'fa-eye';
    balanceIcon: string = 'fa-eye';
    totalbalanceIcon: string = 'fa-eye';

    year: number = this.getCurrentYear();
    periodCategory: Array<any>;
    dataSets;
    yearSelectedIndex: number;

    constructor(private chartApi: ChartApi, page: Page, loader: LoaderService) {
        super(page, loader);
    }



    getCurrentYear() {
        let date = new Date();
        let year = date.getFullYear();

        return year;
    };
    ngOnInit() {
        this.showIncomeList = true;
        this.getEffectiveDate();
        this.search();
    }


    getEffectiveDate() {
        this.chartApi.chartGetEffectiveDate()
            .subscribe(
            data => {
                let effectiveDateStart: any = data[0];
                let effectiveDateEnd: any = data[1];
                let startYear: number = (new Date(effectiveDateStart)).getFullYear();
                let endYear: number = (new Date(effectiveDateEnd)).getFullYear();
                // let temp = [];
                let temp = [startYear.toString() + '年'];
                // this.periodCategory = [startYear.toString()];
                for (let i = 0; i < endYear - startYear; i++) {
                    let year: string = (startYear + i + 1).toString() + '年';
                    temp.push(year);
                }
                this.periodCategory = temp;
                this.yearSelectedIndex = temp.length - 1;

            });

    }

    public onChange(index) {
        this.year = parseInt(this.periodCategory[index], 10);
        this.search();

    }
    search() {
        console.log('search');
        this.chartApi.chartYearSummarizing(this.year)
            .subscribe(
            data => {
                this.dataSets = _.cloneDeep(data);
                let temp = [];
                console.log('111', JSON.stringify(data));
                for (let i = 0; i < 12; i++) {
                    temp.push({
                        month: data.xValues[i],
                        income: data.series[0][i],
                        expense: data.series[1][i],
                        balance: data.series[2][i],
                        totalBalance: data.series[3][i]
                    });
                }
                this.categoricalSource = temp;
                let testList = this.categoricalSource;
                console.log('this._categoricalSource', JSON.stringify(temp));
            },
            req => {
                if (req._body && req._body.errors) {
                    this.showError(req._body.errors);
                } else {
                    this.showError(JSON.stringify(req));
                }
            }
            );


    }

    hideCertain() {
        let newDataSet = _.cloneDeep(this.dataSets);
        let temp = [];
        for (let i = 0; i < 12; i++) {
            temp.push({
                month: newDataSet.xValues[i],
                income: this.showIncome ? newDataSet.series[0][i] : 0,
                expense: this.showExpense ? newDataSet.series[1][i] : 0,
                balance: this.showBalance ? newDataSet.series[2][i] : 0,
                totalBalance: this.showTotalBalance ? newDataSet.series[3][i] : 0
            });
        }
        console.log('newDataSet', JSON.stringify(temp));
        this.categoricalSource = temp;
        console.log('this._categoricalSource', this.categoricalSource);
    }


    public changeIncomeStatus() {
        this.showIncome = !this.showIncome;
        if (this.showIncome) {
            this.incomeIcon = 'fa-eye';
            // this.showIncomeList = true;
            this.hideCertain();

        } else {
            this.incomeIcon = 'fa-eye-slash';
            // this.showIncomeList = false;
            console.log('this.showIncomeListfalse', this.showIncomeList);
            // this.search();

            this.hideCertain();
        }
    }
    public changeExpenseStatus() {
        this.showExpense = !this.showExpense;
        if (this.showExpense) {
            this.expenseIcon = 'fa-eye';
            this.hideCertain();

        } else {
            this.expenseIcon = 'fa-eye-slash';
            this.hideCertain();
        }
    }
    public changeBalanceStatus() {
        this.showBalance = !this.showBalance;
        if (this.showBalance) {
            this.balanceIcon = 'fa-eye';
            this.hideCertain();

        } else {
            this.balanceIcon = 'fa-eye-slash';
            this.hideCertain();
        }
    }
    public changeTotalBalanceStatus() {
        this.showTotalBalance = !this.showTotalBalance;
        if (this.showTotalBalance) {
            this.totalbalanceIcon = 'fa-eye';
            this.hideCertain();

        } else {
            this.totalbalanceIcon = 'fa-eye-slash';
            this.hideCertain();
        }
    }




}




