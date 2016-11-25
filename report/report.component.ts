import {
    Component, ElementRef, ViewChild,
    Injectable, OnInit, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { ObservableArray } from 'data/observable-array';
import { LoaderService } from '../../service/core/loader';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'ui/page';
import { BaseComponent } from '../shared/base.component';
import { ListViewEventData } from 'nativescript-telerik-ui-pro/listview';
import { ChartEventData } from 'nativescript-telerik-ui-pro/chart';


@Component({
    selector: 'gpm-report',
    templateUrl: './component/report/report.component.html',
    styleUrls: ['./component/report/report.component.css']
})
@Injectable()
export class ReportComponent extends BaseComponent implements OnInit {
    dataItems: ObservableArray<any>;

    constructor(page: Page, loader: LoaderService, private router: Router, private routerExt: RouterExtensions) {
        super(page, loader);
    }

    ngOnInit() {
        // let tempList = [
        //     { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: false },
        //     { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: true },
        //     { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: false },
        //     { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: false }
        // ];

        let list = [
            { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: true, url: '/report-daily' },
            { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-income' },
            { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-expense' },
            { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: false, url: '/report-annual' }
        ];

        if (this.router.url === '/report-expense') {
            list = [
                { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: false, url: '/report-daily' },
                { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-income' },
                { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: true, url: '/report-expense' },
                { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: false, url: '/report-annual' }
            ];
        }
        if (this.router.url === '/report-income') {
            list = [
                { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: false, url: '/report-daily' },
                { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: true, url: '/report-income' },
                { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-expense' },
                { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: false, url: '/report-annual' }
            ];
        }
        if (this.router.url === '/report-annual') {
            list = [
                { id: 0, name: '收支日报', icon: 'fa-bar-chart', isSelected: false, url: '/report-daily' },
                { id: 1, name: '收入明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-income' },
                { id: 2, name: '支出明细', icon: 'fa-pie-chart', isSelected: false, url: '/report-expense' },
                { id: 3, name: '收支汇总', icon: 'fa-line-chart', isSelected: true, url: '/report-annual' }
            ];
        }

        console.log(this.router.url);

        this.dataItems = new ObservableArray<any>(list);
    }


    public onItemTap(selectedItem) {
        this.routerExt.navigate([selectedItem.url], {
            clearHistory: true,
            // transition: {
            //     name: 'slideRight',
            // },
            animated: false
        });
    }

    onNavBtnTap() {
        this.routerExt.navigate(['/dashboard'],
            {
                transition: {
                    name: 'slideRight',
                }
            });
    }
}

