import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';

@Component({
  selector: 'app-spin00901',
  templateUrl: './spin00901.component.html',
  styleUrls: ['./spin00901.component.less']
})
export class Spin00901Component extends BaseComponent implements OnInit {

  override fnInit() {
   
  }
  override destroy() {
   
  }
  override DisplayScreenID: UrlDisplayId = UrlDisplayId.spin00901;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
    protected override modalVideoyoutube: VideoyoutubeService,
  ) { 
    super(webService,router,cdf,datePipe,tabService,modalVideoyoutube);
  }
}
