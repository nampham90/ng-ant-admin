import { Component, OnInit } from '@angular/core';
import { ChiPhiDVTN } from '@app/core/model/chiphidichvuthuengoai.model';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Spin00301subcpdvtn } from './spin00301subcpdvtn.model';

@Component({
  selector: 'app-spin00301subcpdvtn',
  templateUrl: './spin00301subcpdvtn.component.html',
  styleUrls: ['./spin00301subcpdvtn.component.less']
})
export class Spin00301subcpdvtnComponent implements OnInit {

  params!: Spin00301subcpdvtn;
  cpdvtncd!: ChiPhiDVTN;

  nguonxenhaphang = "";
  sdtnguonxenhaphang = "";
  sotiennhaphang = 0;

  nguonxetrahang = "";
  sdtnguonxetrahang = "";
  sotientrahang = 0;

  tennccbocxep = "";
  sotienbocxep = 0;

  tennccxecau = "";
  sotienxecau = 0;

  constructor(
    private modalRef: NzModalRef, 
  ) { }

  ngOnInit(): void {
    this.getCPDVTN(this.params.cpdvtncd);
  }

  getCPDVTN(cpdvtncd:ChiPhiDVTN) {
    this.nguonxenhaphang = cpdvtncd.tangbonhaphang?.datacd!;
    this.sdtnguonxenhaphang = cpdvtncd.tangbonhaphang?.sodienthoai!;
    this.sotiennhaphang = cpdvtncd.sotiennhaphang!;

    this.nguonxetrahang = cpdvtncd.tangbotrahang?.datacd!;
    this.sdtnguonxetrahang = cpdvtncd.tangbotrahang?.sodienthoai!;
    this.sotientrahang = cpdvtncd.sotientrahang!;

    this.tennccbocxep = cpdvtncd.dichvubocxep?.tennhacungcap!;
    this.sotienbocxep = cpdvtncd.sotienbocxep!;

    this.tennccxecau = cpdvtncd.dichvuxecau?.tennhacungcap!
    this.sotienxecau = cpdvtncd.sotienxecau!;
  }
}
