import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SocketService } from '@app/core/services/common/socket.service';
import { CommonService } from '@app/core/services/http/common/common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  connect$!: Observable<any>;
  constructor(
    private socketService:SocketService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.requestInit();
    this.connect$.subscribe(data=>{
      console.log(data);
    });
  }

  requestInit(){
    this.connect$ = this.commonService.requestInit({});
  }
}
