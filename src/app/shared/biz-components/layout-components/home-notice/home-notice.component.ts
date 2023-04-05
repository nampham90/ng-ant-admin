import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NotifiService } from '@app/core/services/common/notifi.service';
import { WebserviceService } from '@app/core/services/common/webservice.service';
import * as Const from "src/app/common/const";
@Component({
  selector: 'app-home-notice',
  templateUrl: './home-notice.component.html',
  styleUrls: ['./home-notice.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNoticeComponent implements OnInit {
  constructor(
    private webService: WebserviceService,
    private notifiService: NotifiService
  ) {}

  listsystem = [];
  listnotifi = [];
  listvison = [];

  ngOnInit(): void {
    if(this.notifiService.status === false) {
       this.listsystem = this.notifiService.lstsystem;
       this.listnotifi = this.notifiService.lstnotifi;
       this.listvison = this.notifiService.lstvison;
    } else {
      this.getListSystem();
      this.getListNotifi();
      this.getListVison();
    }
  }

  getListSystem() {
    this.webService.PostCallWs(Const.NhatkyhethongfindType,{loaithongbao:Const.System},(response)=> {
       this.listsystem = response;
    })
  }

  getListNotifi() {
    this.webService.PostCallWs(Const.NhatkyhethongfindType,{loaithongbao:Const.Notifi},(response)=> {
      this.listnotifi = response;
   })
  }

  getListVison() {
    this.webService.PostCallWs(Const.NhatkyhethongfindType,{loaithongbao:Const.Vison},(response)=> {
      this.listvison = response;
   })
  }
}
