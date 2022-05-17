import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';
import { tap } from 'rxjs';
import { ZoomComponentService } from './zoom.component.service';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.3.5/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Component({
  selector: 'stack-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent implements OnInit {
  constructor(private zoomComponentService: ZoomComponentService) {}

  ngOnInit(): void {
    this.zoomComponentService
      .getSignature()
      .pipe(tap((data: any) => this.startMeeting(data.signature)))
      .subscribe();
  }

  startMeeting(signature: string) {
    (document.getElementById('zmmtg-root') as any).style.display = 'block';

    ZoomMtg.init({
      leaveUrl: 'http://localhost:4200',
      success: (success: any) => {
        console.log(success);
        ZoomMtg.join({
          signature: signature,
          meetingNumber: '9733863734',
          userName: 'Tony',
          sdkKey: 'iVC8KRzazy9YY1PwfS1fZmAXcipsfImltavQ',
          userEmail: 'tonyxavier2016@gmail.com',
          passWord: '4xCgNh',
          tk: '',
          success: (success: any) => {
            console.log(success);
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
