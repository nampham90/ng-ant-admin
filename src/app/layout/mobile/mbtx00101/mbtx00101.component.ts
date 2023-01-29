import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TaixeService } from '@app/core/services/http/taixe/taixe.service';
import { Chuyen } from '@app/core/model/chuyen.model';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-mbtx00101',
  templateUrl: './mbtx00101.component.html',
  styleUrls: ['./mbtx00101.component.less']
})
export class Mbtx00101Component implements OnInit {

  @ViewChild('hangdi', { static: true }) hangdi: ViewChild | any;
  @ViewChild('hangve', { static: true }) hangve: ViewChild | any;

  lsthangdi: any[] = [];
  lsthangve: any[] = [];
  chuyen: NzSafeAny;
  thumbStyle = {
    width: '32px',
    height: '32px',
    "border-radius" : "50px"
  };

  steps: any[]= [];
  current = 0;

  onChange(event: any) {
    //console.log(event);
  }
  constructor(
    private dataService : TaixeService,
    private cdf :  ChangeDetectorRef
  ) {
    
   }

  ngOnInit(): void {
    this.requestInit();
    this.steps = [
      {
        title: 'Chuẩn bị bóc hàng',
        description: 'This is description',
      },
      {
        title: 'Đã bóc',
        description: 'This is description',
      },
      {
        title: 'Đã trả',
        description: 'This is description',
      },
    ];
    this.cdf.markForCheck();
  }

  // request Init 
  requestInit() {
    let req = {
      "mode" : "app"
    }
    this.dataService.getInitTaiXe(req)
    .pipe()
    .subscribe(res => {
       this.chuyen = res.resdataChuyen;
       this.lsthangdi = res.reslistHangdi;
       this.lsthangve = res.reslistHangve;
       
       this.cdf.markForCheck();
    })
  }

  pre(): void {
    this.current -= 1;
  }

  next(n: any): void {
    n += 1;
  }

  done(n: any): void {
    n += 1;
    console.log('done');
  }

}
