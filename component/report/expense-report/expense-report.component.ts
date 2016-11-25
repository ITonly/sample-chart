import {
    Component, ElementRef, ViewChild,
    Injectable, OnInit, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { LoaderService } from '../../../service/core/loader';
import { ObservableArray } from 'data/observable-array';

import { ChartApi } from '../../../api/accounting/api/ChartApi';
import * as _ from 'lodash';

import { Page } from 'ui/page';
import { BaseComponent } from '../../shared/base.component';
import * as moment from 'moment';
import { isAndroid, isIOS, device, screen } from 'platform';


@Component({
    selector: 'gpm-expense-report',
    templateUrl: './component/report/expense-report/expense-report.component.html',
    styleUrls: ['./component/report/expense-report/expense-report.component.css'],
    providers: [ChartApi]
})
@Injectable()
export class ExpenseReportComponent extends BaseComponent implements OnInit {
    pieSource: ObservableArray<ExpenseData>;
    dataSets;
    categoryList: ObservableArray<Category>;
    chartVisible: String = 'visible';
    startDate: string = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
    endDate: string = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');

    totalAmount: number;
    constructor(page: Page, loader: LoaderService, private chartApi: ChartApi) {
        super(page, loader);
    }

    ngOnInit() {

    }

    public startDateChange(args) {
        console.log('dateChange =>' + args);
        let tempDate = new Date(moment(args).format('YYYY-MM-DD'));
        this.startDate = moment(args).format('YYYY-MM-DD');
        console.log('dateChange');
    }

    public endDateChange(args) {
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
                let expenseList: any = _.filter(this.dataSets.xValues, function (item) {
                    let tempExpense: any = item;
                    return (tempExpense.businessCategoryType.value === 'Outcome' && tempExpense.level === 1);
                });

                let amount: number = 0;
                amount = _.sumBy(expenseList, function (itemData) {
                    let item: any = itemData;
                    return item.balance;
                });

                if (amount > 0) {
                    this.setPieSource(expenseList);
                    this.chartVisible = 'visible';
                } else {
                    this.chartVisible = 'collapse';
                }
                this.setListSource(expenseList, amount);
                this.totalAmount = amount;
            },
            error => {
                console.log('expense=>', JSON.stringify(error));
            }
            );
    }

    setPieSource(expenseList) {
        let arrayExpenseData: Array<ExpenseData> = [];
        for (let i = 0; i < expenseList.length; i++) {
            arrayExpenseData.push({
                category: expenseList[i].name,
                amount: expenseList[i].balance
            });
        }
        this.pieSource = new ObservableArray<ExpenseData>(arrayExpenseData);
    }

    setListSource(expenseList, totalAmount) {
        let arrCategory: Array<Category> = [];
        let color = ['#4FB6E7', '#A666CE', '#9DCC00', '#F9BA1A', '#F5413F', '#5977F4', '#42B571', '#B6632F', '#4FB6E7'];
        if (isIOS) {
            color = ['#6FB6F7', '#F98D87', '#7B7B93', '#426BDB', '#7174F9', '#FBB18B', '#A6A6B3', '#955DC4', '#408FF3'];
        }
        let label = ['薪资福利', '行政支出', '差旅交通', '房租物业', '经营支出', '税费', '采购', '资金往来', '投资融资'];
        for (let i = 0; i < expenseList.length; i++) {
            arrCategory.push({
                color: color[i],
                name: label[i],
                percent: totalAmount === 0 ? 0 : expenseList[i].balance / totalAmount,
                amount: expenseList[i].balance
            });
        }
        this.categoryList = new ObservableArray<Category>(arrCategory);
    }

    ngAfterViewInit() {

        this.refresh(_ => {
            this.startDate = moment([moment().year(), moment().month(), 1]).format('YYYY-MM-DD');
            this.endDate = moment([moment().year(), moment().month(), 1]).endOf('month').format('YYYY-MM-DD');
            this.search();
        }
        );

    }
}

export class ExpenseData {
    constructor(public category?: string, public amount?: number) {
    }
}

export class Category {
    constructor(public color?: string, public name?: string, public percent?: number, public amount?: number) {
    }
}
// #6FB6F7 商品销售
// #F98D87 产品销售
// #7B7B93 服务收入
// #426BDB 利息收入
// #7174F9 资金往来
// #FBB18B 投资融资

// #6FB6F7 薪资福利
// #F98D87 行政支出
// #7B7B93 差旅交通
// #426BDB 房租物业
// #7174F9 经营支出
// #FBB18B 税费
// #A6A6B3 采购
// #955DC4 资金往来
// #6FB6F7 投资融资
