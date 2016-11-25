import {
    Component, ElementRef, ViewChild,
    Injectable, OnInit, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { ObservableArray } from 'data/observable-array';
import { LoaderService } from '../../../service/core/loader';

import { ChartApi } from '../../../api/accounting/api/ChartApi';
import * as _ from 'lodash';

import { Page } from 'ui/page';
import { BaseComponent } from '../../shared/base.component';
import * as moment from 'moment';
import { isAndroid, isIOS, device, screen } from 'platform';


@Component({
    selector: 'gpm-income-report',
    templateUrl: './component/report/income-report/income-report.component.html',
    styleUrls: ['./component/report/income-report/income-report.component.css'],
    providers: [ChartApi]
})
@Injectable()
export class IncomeReportComponent extends BaseComponent implements OnInit {
    pieSource: ObservableArray<IncomeData>;
    dataSets;
    categoryList: ObservableArray<Category>;
    chartVisible: String = 'visible';
    startDate: string;// = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
    endDate: string;// = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');


    totalAmount: number;
    constructor(page: Page, loader: LoaderService, private chartApi: ChartApi) {
        super(page, loader);
    }

    ngOnInit() {
        this.startDate = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
        this.endDate = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');
    }

    public startdateChange(args) {
        console.log('dateChange =>' + args);
        let tempDate = new Date(moment(args).format('YYYY-MM-DD'));
        this.startDate = moment(args).format('YYYY-MM-DD');
        console.log('dateChange');
        this.search();
    }

    public enddateChange(args) {
        console.log('dateChange =>' + args);
        let tempDate = new Date(moment(args).format('YYYY-MM-DD'));
        this.endDate = moment(args).format('YYYY-MM-DD');
        console.log('dateChange');
        this.search();
    }

    search() {
        if (this.startDate > this.endDate) {
            this.endDate = this.startDate;
        }
        this.chartApi.chartCurrentPeriod(this.startDate, this.endDate)
            .subscribe(
            data => {
                this.dataSets = _.cloneDeep(data);
                for (let i = 0; i < data.series[0].length; i++) {
                    this.dataSets.xValues[i].balance = data.series[0][i];
                };

                let incomeList: any = _.filter(this.dataSets.xValues, function(item) {
                    let tempIncome: any = item;
                    return (tempIncome.businessCategoryType.value === 'Income' && tempIncome.level === 1);
                });

                let amount: number = 0;
                amount = _.sumBy(incomeList, function(itemData) {
                    let item: any = itemData;
                    return item.balance;
                });

                if (amount > 0) {
                    this.setPieSource(incomeList);
                    this.chartVisible = 'visible';
                } else {
                    this.chartVisible = 'collapse';
                }
                this.setListSource(incomeList, amount);
                this.totalAmount = amount;
            },
            error => {
                console.log('loadchart error=>', JSON.stringify(error));
            }
            );
    }

    setPieSource(incomeList) {
        let arrayIncomeData: Array<IncomeData> = [];
        for (let i = 0; i < incomeList.length; i++) {
            arrayIncomeData.push({
                category: incomeList[i].name,
                amount: incomeList[i].balance
            });
        }
        this.pieSource = new ObservableArray<IncomeData>(arrayIncomeData);
    }

    setListSource(incomeList, totalAmount) {
        let arrCategory: Array<Category> = [];
        let color = ['#4FB6E7', '#A666CE', '#9DCC00', '#F9BA1A', '#F5413F', '#5977F4'];
        if (isIOS) {
            color = ['#6FB6F7', '#F98D87', '#7B7B93', '#426BDB', '#7174F9', '#FBB18B'];
        }
        let label = ['商品销售', '产品销售', '服务收入', '利息收入', '资金往来', '投资融资'];
        for (let i = 0; i < incomeList.length; i++) {
            arrCategory.push({
                color: color[i],
                name: label[i],
                percent: totalAmount === 0 ? 0 : incomeList[i].balance / totalAmount,
                amount: incomeList[i].balance
            });
        }
        this.categoryList = new ObservableArray<Category>(arrCategory);
    }

    ngAfterViewInit() {
        this.refresh(
            _ => {
                this.startDate = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
                this.endDate = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');
                this.search();
            });
    }
}

export class IncomeData {
    constructor(public category?: string, public amount?: number) {
    }
}

export class Category {
    constructor(public color?: string, public name?: string, public percent?: number, public amount?: number) {
    }
}
