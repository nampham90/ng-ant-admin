

import { Component,OnDestroy, OnInit, Injector, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IObjectString } from 'src/app/common/IObject';
import { WebserviceService,ObjectDataSC ,Product} from 'src/app/core/services/common/webservice.service';
import * as Const from 'src/app/common/const';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';


@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    providers: [DatePipe]
  })
export abstract class BaseComponent implements OnInit, OnDestroy {

    formItemNm: IObjectString = {};
    list:any = [];
    title = 'nam pham';

    constHttt = Const.Hinhthucthanhtoan;
    constructor(
        protected webService: WebserviceService,
        protected router:Router,
        protected  cdf :  ChangeDetectorRef,
        protected datePipe: DatePipe,
        protected tabService: TabService
    ) { }
    ngOnDestroy(): void {
        this.destroy();
    }
    ngOnInit() {
       this.setFormItemNm();
    }

    setFormItemNm() {
        let url = this.router.url;
        this.webService.PostCallWs(Const.Ant100PostUrlParams,{url: url}, (response) => {
            this.list = response;
            this.list.forEach((row: { stt: string; title1: string }) => {
              this.formItemNm[row.stt] = row.title1;
            });
            this.fnInit();
        });
    }

    getDate() {
        let date = this.datePipe.transform(new Date(), 'yyyy/MM/dd')+"";
        return date;
    }

    formatDate(d: any) {
        if(d == null || d == '') {
            return '';
        }
        let date = this.datePipe.transform(d, 'yyyy/MM/dd') + "";
        return date;
    }

    transfer(path: string) {
        let index =  this.tabService.findIndex(path);
        if(index == -1) {
          this.router.navigate([path]);
        } else {
          this.tabService.delTab(this.tabService.getTabArray()[index],index);
          this.router.navigate([path]);
        }
    }

    mergeHttt(httt: any) {
        let strHttt = httt + "";
        let htttnm  = "";
        for(let element of this.constHttt) {
           if(element.value === strHttt) {
             htttnm = element.lable;
           }
        }
        return htttnm;
    }

    abstract fnInit(): any;
    abstract destroy(): any;
    abstract DisplayScreenID: UrlDisplayId;
}
