import {
    Component, OnInit, Inject, Input, Output, EventEmitter, AfterViewInit,
    OnDestroy
} from '@angular/core';
import { isAndroid, isIOS, device, screen } from 'platform';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import { Device, platformNames } from 'platform';
import { RouterExtensions } from 'nativescript-angular/router';
import { DEVICE } from 'nativescript-angular/platform-providers';
import { View } from 'ui/core/view';
import { Page } from 'ui/page';
import { Router } from '@angular/router';
import * as Dialogs from 'ui/dialogs';
import { Subscription } from 'rxjs/Subscription';
import { BackgroundService } from '../../../service/core/background.service';

@Component({
    selector: 'gpm-action-bar',
    templateUrl: './component/shared/action-bar/action-bar.component.html'
})
export class ActionBarComponent implements OnInit, OnDestroy {
    @Input('actionTitle') title: string;
    @Input('showNav') showNavBack: boolean = false;
    @Input('hide') hideAction: boolean = false;
    @Input('useCustomTap') useCustomTap: boolean = false;
    @Input('allowTitleClick') allowTitleClick: boolean = false;
    @Output() onNavTap = new EventEmitter();
    @Output() onTitleTap = new EventEmitter();

    private isNoConnection: boolean = false;
    private navIcon: string = 'res://ic_menu';
    private navIconIos: string = 'ion-navicon';
    private subscription: Subscription;
    private showBar: boolean = false;

    constructor(private fonticon: TNSFontIconService,
        @Inject(DEVICE) private device: Device,
        private routerExtensions: RouterExtensions,
        private backgroundService: BackgroundService,
        private page: Page, private router: Router) {

    }

    ngOnInit() {
        if (this.showNavBack) {
            this.navIcon = 'res://ic_back';
            this.navIconIos = 'ion-ios-arrow-back';
        } else {
            this.navIcon = 'res://ic_menu';
            this.navIconIos = 'ion-navicon';
        }

        this.page.actionBarHidden = this.hideAction;

        console.log('onNavBtnTap 11111=>', this.showNavBack, this.useCustomTap);
        console.log('subscribe to connectionChange');
        this.subscription = this.backgroundService.onConnectionChanged.subscribe(
            connectionType => {
                console.log('connnection change');
                if (connectionType === 'none') {
                    this.routerExtensions.navigate(['/'],
                        {
                            clearHistory: true,
                            transition: {
                                name: 'slideRight',
                            },
                            animated: false

                        });
                    // this.router.navigate(['/']);
                }
            });
        if (isAndroid) {
            console.log('isAndroid', isAndroid);
            this.showBar = false;
        } else {
            this.showBar = true;
        }


    }

    onNavBtnTap() {
        console.log('onNavBtnTap=>', this.showNavBack, this.useCustomTap);
        if (!this.showNavBack || this.useCustomTap) {
            this.onNavTap.emit();
        } else {
            this.routerExtensions.backToPreviousPage();
        }
    }

    onActionTitleTap() {
        if (this.allowTitleClick) {
            this.onTitleTap.emit();
        }
    }

    ngOnDestroy() {
        console.log('unsubscribe to connectionChange');
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}
