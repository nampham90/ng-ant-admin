

import { Component,OnDestroy, OnInit, Injector, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IObjectString } from 'src/app/common/IObject';
import { WebserviceService,ObjectDataSC ,Product} from 'src/app/core/services/common/webservice.service';
import * as Const from 'src/app/common/const';
import { Router } from '@angular/router';
import { DatePipe,formatCurrency } from '@angular/common';
import { UrlDisplayId } from '@app/common/UrlDisplay';
import { TabService } from '@app/core/services/common/tab.service';
import { VideoyoutubeService } from '@app/widget/modal/subwindowvideoyoutube/videoyoutube.service';
import { ModalBtnStatus } from '@app/widget/base-modal';


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
        protected tabService: TabService,
        protected modalVideoyoutube: VideoyoutubeService,
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

    getFirstDayOfMonth() {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const formattedFirstDayOfMonth = this.datePipe.transform(firstDayOfMonth, 'yyyy/MM/dd');
        return formattedFirstDayOfMonth;
    }

    getLastDayOfMonth() {
        const currentDate = new Date();
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const formattedLastDayOfMonth = this.datePipe.transform(lastDayOfMonth, 'yyyy/MM/dd');
        return formattedLastDayOfMonth;
    }

    formatDate(d: any) {
        if(d == null || d == '') {
            return '';
        }
        let date = this.datePipe.transform(d, 'yyyy/MM/dd') + "";
        return date;
    }

    displayVND(sotien: number) {
        const amount = sotien*1000;
        const currencyCode = 'đ';
        const display = 'symbol-narrow';
        const digitsInfo = '1.0-0';
        const locale = 'vi-VN';
        const result = formatCurrency(amount, locale, currencyCode, display, digitsInfo);
        return result;
    }

    displayOD(od:string) {
        const lastod = od.slice(-5);
        const remaiod = od.substring(0, od.length - 5);
        return lastod + '-' + remaiod
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

    // trả về idyoutube
    showVideo() {
        const myString = this.router.url;
        const myArray = myString.split("/");
        const result = myArray[myArray.length - 2] + "/" + myArray[myArray.length - 1];
        this.webService.PostCallWs(Const.Tmt101Ant100Detail,{urldisplayid:result}, (response)=> {
            let idyoutube = response;
            if(idyoutube) {
                this.modalVideoyoutube.show({nzTitle: "Hướng dẫn sử dụng"},{showcomfirm:false,idvideo:idyoutube}).subscribe(
                    res => {
                        if (!res || res.status === ModalBtnStatus.Cancel) {
                            return;
                        }
                    }
                )
            }
        })
    }

    abstract fnInit(): any;
    abstract destroy(): any;
    abstract DisplayScreenID: UrlDisplayId;
}
