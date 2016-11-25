import { Component, ElementRef, ViewChild, AfterViewInit, Injectable, OnInit, ChangeDetectorRef } from '@angular/core';
import { Page } from 'ui/page';
import { ActivatedRoute, Router } from '@angular/router';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui-pro/sidedrawer/angular';
import { BaseComponent } from '../shared/base.component';
import { StorageService } from '../../service/core/storage.service';
import { AuthorizationService } from '../../service/core/authorization.service';

import { CompanyModel } from '../../api/identity/model/CompanyModel';
import { ChartApi } from '../../api/accounting/api/ChartApi';
import { IncomeOutcomeSummaryModel } from '../../api/accounting/model/IncomeOutcomeSummaryModel';
import * as moment from 'moment';
import { LoaderService } from '../../service/core/loader';
import * as applicationSettings from 'application-settings';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'gpm-dashboard',
    templateUrl: './component/dashboard/dashboard.component.html',
    providers: [StorageService, ChartApi, AuthorizationService]
})
export class DashboardComponent extends BaseComponent implements OnInit, AfterViewInit {
    actionTitle: string;
    summary: IncomeOutcomeSummaryModel = {
        income: { id: 'income', name: '0' },
        outcome: { id: 'outcome', name: '0' }
    };
    from: string = '';
    totalAmount: number = 0;
    userId: string;

    @ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;

    private drawer: SideDrawerType;
    private navIcon: string = 'res://ic_menu';

    constructor(private route: ActivatedRoute, private routerExtensions: RouterExtensions, private authorizationService: AuthorizationService,
        page: Page, loader: LoaderService, private storage: StorageService,
        private chartApi: ChartApi, private router: Router) {
        super(page, loader);
    }

    ngOnInit() {
       
        let token = this.storage.getToken();
        let currentCompany = token.user.currentCompany;
        this.userId = this.authorizationService.session.user.id;
        this.actionTitle = this.authorizationService.session.user.currentCompany.companyName;
    }

    onTitleTap() {
        console.log('tap=>');
        this.routerExtensions.navigate(['/company-list', { id: this.userId }],
            {
                transition: {
                    name: 'slideLeft',
                }
            });
    }

    onNavigationTap() {
        if (this.drawer.getIsOpen()) {
            this.drawer.closeDrawer();
        } else {
            this.drawer.showDrawer();
        }
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
       
            this.initTransactionAmount();
      
    }

    initTransactionAmount() {
        console.log('this.actionTitle', this.actionTitle);

        let startDate = moment([moment().year(), moment().month(), 1]);
        let endDate = startDate.clone().endOf('month');
        this.chartApi.chartIncomeOutcomeSummary(startDate.format('YYYY-MM-DD'),
            endDate.format('YYYY-MM-DD')).subscribe(
            data => {
                console.log('chartIncomeOutcomeSummary=>', JSON.stringify(data));
                if (!data) return;
                this.summary = data;
                this.totalAmount = Number(data.income.name) - Number(data.outcome.name);
            },
            req => {
                if (req._body && req._body.errors) {
                } else {
                }
            });
        // let isWarned = this.route.
        // this.checkCompanyExpired();
    }


}
