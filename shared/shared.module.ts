import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { CHART_DIRECTIVES } from 'nativescript-telerik-ui-pro/chart/angular';
import { SIDEDRAWER_DIRECTIVES } from 'nativescript-telerik-ui-pro/sidedrawer/angular';
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui-pro/listview/angular';
import { TNSFontIconPipe, TNSFontIconPurePipe } from 'nativescript-ng2-fonticon';
import { IfAndroidDirective, IfIosDirective } from './if-platform.directive';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { DatePickerDialogComponent } from './datepicker-dialog/datepicker-dialog.component';
import { DialogContentComponent } from './datepicker-dialog/dialog-content.component';
import { PdfviewPageComponent } from './pdfview-page/pdfview-page.component';
import { LoaderService } from '../../service/core/loader';


@NgModule({
    imports: [NativeScriptModule, NativeScriptFormsModule, NativeScriptRouterModule],
    entryComponents: [DialogContentComponent],
    declarations: [DrawerContentComponent, SIDEDRAWER_DIRECTIVES, LISTVIEW_DIRECTIVES, CHART_DIRECTIVES,
        TNSFontIconPipe, TNSFontIconPurePipe, IfAndroidDirective, IfIosDirective, ActionBarComponent,
        DatePickerDialogComponent, DialogContentComponent, PdfviewPageComponent],
    exports: [DrawerContentComponent, SIDEDRAWER_DIRECTIVES, LISTVIEW_DIRECTIVES, CHART_DIRECTIVES,
        TNSFontIconPipe, TNSFontIconPurePipe, IfAndroidDirective, IfIosDirective, ActionBarComponent,
        DatePickerDialogComponent, DialogContentComponent, PdfviewPageComponent],
    providers: [LoaderService]
})
export class SharedModule { }
