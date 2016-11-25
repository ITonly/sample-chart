import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebView, LoadEventData } from 'ui/web-view';
import { Page } from 'ui/page';
import { LoaderService } from '../../../service/core/loader';

@Component({
    selector: 'gpm-pdfview-page',
    templateUrl: './component/shared/pdfview-page/pdfview-page.component.html',
    providers: [LoaderService]
})
export class PdfviewPageComponent implements OnInit {
    src: string = 'https://app.guanplus.com/assets/template/privacy.pdf';
    title: string = '隐私条款';

    constructor(private page: Page, private actRouter: ActivatedRoute, private loader: LoaderService) {
    }

    ngOnInit() {
        let id = this.actRouter.snapshot.params['id'];
        if (id === 'user-agreement') {
            this.src = 'https://app.guanplus.com/assets/template/user-agreement.pdf';
            this.title = '用户协议';
        }

        let webview: WebView = this.page.getViewById<WebView>('wv');
        if (this.loader) {
            let self: any = this;
            webview.on(WebView.loadStartedEvent, function(args: LoadEventData) {
                self.loader.show();
            });

            webview.on(WebView.loadFinishedEvent, function(args: LoadEventData) {
                self.loader.hide();
            });
        };

    }
}
