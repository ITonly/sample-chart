import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import { BackgroundService } from './service/core/background.service';
import * as connectivity from 'connectivity';
import * as moment from 'moment';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private tnsFontIconService: TNSFontIconService,
        private backgroundService: BackgroundService, private zone: NgZone) {
        moment.locale('zh-cn');
    }

    ngOnInit() {
        console.log('app component on init');
        connectivity.startMonitoring((newConnectionType: number) => {
            this.zone.run(() => {
                console.log('connecction type ' + newConnectionType);
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        this.backgroundService.connectionChange('none');
                        console.log('connection type change to none');
                        break;
                    case connectivity.connectionType.wifi:
                        this.backgroundService.connectionChange('wifi');
                        console.log('Connection type changed to WiFi.');
                        break;
                    default:
                        this.backgroundService.connectionChange('mobile');
                        console.log('Connection type changed to mobile.');
                        break;
                }
            });
        });
    }

    ngOnDestroy() {
        console.log('app component on destroy');
        connectivity.stopMonitoring();
    }


}
