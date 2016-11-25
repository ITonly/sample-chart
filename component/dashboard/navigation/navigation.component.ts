import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouteStateService } from '../../../service/core/route-state-service';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { isAndroid, isIOS, device, screen } from 'platform';

@Component({
    selector: '[gpm-dashboard-navigation]',
    templateUrl: './component/dashboard/navigation/navigation.component.html',
    styleUrls: ['./component/dashboard/navigation/navigation.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
    items: Array<any>;
    isAddClick: boolean = false;
    addFabVisiblity: string = 'collapse';
    ionIcon: string = 'ion-plus-circled';
    ionColor: string = 'ion fab fab-default';
    constructor(private routerExtensions: RouterExtensions, private router: Router, private routeStateService: RouteStateService) {

    }

    public fabDefaultTap() {
        console.log('fab tap');

        this.toggleFab();
    }

    toggleFab() {
        this.isAddClick = !this.isAddClick;
        if (this.isAddClick) {
            this.addFabVisiblity = 'visible';
            this.ionIcon = 'ion-close-circled';
            this.ionColor = 'ion fab fab-primary';
        } else {
            this.addFabVisiblity = 'collapse';
            this.ionIcon = 'ion-plus-circled';
            this.ionColor = 'ion fab fab-default';
        }
    }

    routeLink(args) {
        this.routeStateService.clear();
        if (args === 'Income') {
            this.routerExtensions.navigate(['/transaction-detail', { id: 'Income' }],
                {
                    transition: {
                        name: 'slideRight',
                    }
                });

        } else if (args === 'Outcome') {
            this.routerExtensions.navigate(['/transaction-detail', { id: 'Outcome' }],
                {
                    transition: {
                        name: 'slideRight',
                    }
                });
        } else {
            this.routerExtensions.navigate(['/transfer/transferId'],
                {
                    transition: {
                        name: 'slideRight',
                    }
                });

        }

    }

    ngOnInit() {
        this.items = [
            { id: 1, name: '收支列表', path: '/transaction', icon: '~/images/ic_trans_list.png' },
            { id: 2, name: ' 账户', path: '/account', icon: '~/images/ic_account.png' },
            { id: 3, name: '报表', path: '/report-income', icon: '~/images/ic_chart.png' },
            { id: 4, name: '部门信息', path: '/departmentList/dashboard', icon: '~/images/ic_department.png' },
            { id: 5, name: '收支类别', path: '/category/dashboard', icon: '~/images/ic_trans_category.png' },
            { id: 6, name: '往来信息', path: '/contactList/dashboard', icon: '~/images/ic_contacts.png' }
            // { id: 7, name: '地址', path: '/address-list/id', icon: '~/images/ic_statement.png' }
        ];
    }
}
