import { Router } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions, XSRFStrategy } from '@angular/http';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { NgModule, enableProdMode } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { TNSFontIconService } from 'nativescript-ng2-fonticon';
import { RouterExtensions } from 'nativescript-angular/router';

import { ACCOUNTING_BASE_PATH } from './api/accounting';
import { IDENTITY_BASE_PATH } from './api/identity';
import { AccountApi } from './api/identity/api/AccountApi';

import {
    StorageService, HttpBaseService, GPXSRFStrategy, LoaderService,
    AuthorizationService, Config, BackgroundService, RouteStateService
} from './service/core';

import { ExternalModule } from './component/external/external.module';
import { SharedModule } from './component/shared/shared.module';
import { DashboardModule } from './component/dashboard/dashboard.module';
import { SettingsModule } from './component/settings/settings.module';
import { ReportModule } from './component/report/report.module';
import { TransactionModule } from './component/transaction/transaction.module';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

// comment below for bundle build
 let ENVIRONMENT: 'production';

let isProduction = { 'value': ENVIRONMENT };

if (isProduction.value) {
    enableProdMode();
}

export function httpHelperFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
    router: Router, storageService: StorageService, loaderService: LoaderService) {
    return new HttpBaseService(xhrBackend, requestOptions,
        router, storageService, loaderService);
}

@NgModule({
    imports: [
        NativeScriptModule, NativeScriptRouterModule, NativeScriptFormsModule,
        NativeScriptRouterModule.forRoot(routes), HttpModule, ExternalModule,
        SharedModule, DashboardModule,
        SettingsModule,
        ReportModule,
        TransactionModule
    ],
    declarations: [
        AppComponent
    ],
    exports: [],
    bootstrap: [AppComponent],
    providers: [
        AccountApi, StorageService, LoaderService, Config, BackgroundService,
        AuthorizationService, RouteStateService,
        { provide: XSRFStrategy, useValue: new GPXSRFStrategy() },
        { provide: ACCOUNTING_BASE_PATH, useValue: 'https://api-accounting-stage.guanplus.com' },
         { provide: IDENTITY_BASE_PATH, useValue: 'https://api-identity-stage.guanplus.com' },
        // { provide: ACCOUNTING_BASE_PATH, useValue: 'https://api-accounting.guanplus.com' },
        // { provide: IDENTITY_BASE_PATH, useValue: 'https://api-identity.guanplus.com' },
        // { provide: ACCOUNTING_BASE_PATH, useValue: RESOURCE_URL },
        // { provide: IDENTITY_BASE_PATH, useValue: IDENTITY_URL },
        {
            provide: Http,
            useFactory: httpHelperFactory,
            deps: [XHRBackend, RequestOptions, Router, StorageService, LoaderService]
        },
        {
            provide: TNSFontIconService,
            useFactory: () => {
                return new TNSFontIconService({
                    'fa': 'fonts/font-awesome.css',
                    'ion': 'fonts/ionicon.css',
                    'wf': 'fonts/onlinewebfonts.css'
                });
            }
        }
    ],
})
export class AppModule { }
