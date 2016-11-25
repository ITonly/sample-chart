import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';
import { AuthorizationService } from '../../../service/core/authorization.service';
import { BaseComponent } from '../../shared/base.component';
import { UserApi } from '../../../api/accounting/api/UserApi';
import { UserModel } from '../../../api/accounting/model/UserModel';
import { LoaderService } from '../../../service/core/loader';

@Component({
    selector: 'gpm-drawer-content',
    templateUrl: './component/shared/drawer-content/drawer-content.component.html',
    styleUrls: ['./component/shared/drawer-content/drawer-content.component.css'],
    providers: [UserApi]
})
export class DrawerContentComponent extends BaseComponent implements OnInit {
    currentCompany: string;
    currentUser: UserModel = {
        id: '',
        name: '',
        department: { id: '', name: '' },
        position: '',
        phoneNumber: '',
        email: '',
    };
    constructor(page: Page, loaderService: LoaderService, private authorizationService: AuthorizationService, private userApi: UserApi) {
        super(page, loaderService);
        this.currentUser.id = this.authorizationService.session.user.id;
        this.currentCompany = this.authorizationService.session.user.currentCompany.companyName;
        this.getUserData(this.currentUser.id);
    }

    getUserData(id) {
        this.userApi.userGet(id)
            .subscribe(
            data => {
                this.currentUser = data;
            },
            error => {
                console.log('drawer =>', JSON.parse(error));
                this.showError(error._body.errors[0]);
            });
    }

    ngOnInit() {
        if (this.authorizationService.session) {
            this.currentUser = this.authorizationService.session.user;
        }
    }
    logOut() {
        this.authorizationService.logout();
    }
}
