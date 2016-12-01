import {
    Component, ElementRef, ViewChild,
    Injectable, OnInit, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { ObservableArray } from 'data/observable-array';
import { LoaderService } from '../../../service/core/loader';

import { Page } from 'ui/page';
import { BaseComponent } from '../../shared/base.component';
import { ChartApi } from '../../../api/accounting/api/ChartApi';
import * as moment from 'moment';

moment.locale('zh-cn');

@Component({
    selector: 'gpm-daily-report',
    templateUrl: './component/report/daily-report/daily-report.component.html',
    styleUrls: ['./component/report/daily-report/daily-report.component.css'],
    providers: [ChartApi]
})
@Injectable()
// >> sidedrawer-angular-transition-definition
export class DailyReportComponent extends BaseComponent implements OnInit {
    _categoricalSource: ObservableArray<TodayData>;
    dayDate = null;
    todayDate = null;
    // stepValue:number = null;

    constructor(page: Page, loader: LoaderService, private chartApi: ChartApi) {
        super(page, loader);
    }


    get categoricalSource(): ObservableArray<TodayData> {
        return this._categoricalSource;
    }
    ngOnInit() {
        this.getCurrentDate();
        this.search();

    }
    getCurrentDate() {
        // let date = new Date();
        this.todayDate = moment().format('YYYY/MM/DD');
        console.log('this.todayDate', this.todayDate);

    };
    public dateChange(args) {
        console.log('dateChange =>' + args);
        // let tempDate = new Date(moment(args).format('YYYY/MM/DD'));
        this.todayDate = moment(args).format('YYYY-MM-DD');
        console.log('tempDate', this.todayDate);
        console.log('dateChange');

        // let tempDate = new Date(moment(args).format('YYYY-MM-DD'));
        // this.startDate = moment(args).format('YYYY-MM-DD');
        // console.log('dateChange');
        // this.search();
        this.search();

    }


    search() {

        this.chartApi.chartDaySummarizing(this.todayDate)
            .subscribe(
            data => {
                let tempdata = ['昨日结余', '本日收入', '本日支出', '本日结余'];
                console.log('data', JSON.stringify(data));
                let temp: Array<TodayData> = [];
                console.log('111', JSON.stringify(data));
                // let tempData=[];
                // for (let i = 0; i < 4; i++) {
                //     tempData.push(data.series[i][0]);
                // }
                // let maxNum = Math.max(...tempData);
                // let minNum = Math.min(...tempData);
                // this.stepValue = (maxNum-minNum)/4;
                // console.log( 'stepValue',this.stepValue);
                // let maxNumber = Math.max(data.series)
                for (let i = 0; i < 4; i++) {
                    temp.push({
                        // items: tempdata[i] + '\n' + data.series[i][0],
                        items: tempdata[i],
                        amount: data.series[i][0]
                    });

                }
                console.log('this.temp', JSON.stringify(temp));
                this._categoricalSource = new ObservableArray<TodayData>(temp);

            });
    }
}

export class TodayData {
    constructor(public items?: string, public amount?: number) {
    }
}
