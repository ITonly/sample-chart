import { NgModule } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { DashboardComponent } from './dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
    imports: [NativeScriptModule, NativeScriptFormsModule, NativeScriptRouterModule,
        SharedModule, PipeModule],
    declarations: [DashboardComponent, NavigationComponent, SummaryComponent],
    exports: [DashboardComponent, NavigationComponent, SummaryComponent]
})
export class DashboardModule { }
