import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import { BaseComponent } from '@app/pages/system/base/base.component';

@Component({
  selector: 'app-spch00255',
  templateUrl: './spch00255.component.html',
  styleUrls: ['./spch00255.component.less']
})
export class Spch00255Component extends BaseComponent implements OnInit {
  fnInit() {
    
  }
  destroy() {
    
  }
  DisplayScreenID: UrlDisplayId = UrlDisplayId.spch00255;

  constructor(
    protected override webService: WebserviceService,
    protected override router: Router,
    protected override cdf :  ChangeDetectorRef,
    protected override  datePipe : DatePipe,
    protected override tabService: TabService,
  ) {
    super(webService,router,cdf,datePipe,tabService);
   }

  override ngOnInit(): void {
  }

}
