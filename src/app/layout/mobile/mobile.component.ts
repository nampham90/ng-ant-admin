import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginInOutService} from '@app/core/services/common/login-in-out.service'

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.less']
})
export class MobileComponent implements OnInit {

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private dataService: LoginInOutService
  ) { }

  ngOnInit(): void {
    this.initData = this.data;
  }

  initData: Array<any> = [];
  valueActive = [];
  show: boolean = false;
  menuHeight: number = document.documentElement.clientHeight * 0.6;
  data: Array<any> = [
    {
      value: '1',
      label: 'Food',
      link: 'mbtx00101'
    },
    {
      value: '2',
      label: 'Supermarket',
      link: 'mbtx00201'
    },
    {
      value: '3',
      label: 'Extra',
      link: 'mbtx00301',
      isLeaf: true
    },
    {
      value: '4',
      label: "Logout"
    }
  ];

  onChange(value: any) {
    this.valueActive = value;
    switch(value[0]) {
      case "1": {
         this.route.navigateByUrl('mobile/mbtx00101');
         this.show = false;
      }; break;
      case "2": {
        this.route.navigateByUrl('mobile/mbtx00201');
        this.show = false;
      }; break;
      case "3": {
        this.route.navigateByUrl('mobile/mbtx00301');
        this.show = false;
      }; break;
      case "4": {
         this.dataService.loginOut();
      }; break;
    }
  }

  handleClick(e: any) {
    e.preventDefault();
    this.show = !this.show;
    if (!this.initData) {
      setTimeout(() => {
        this.initData = this.data;
      }, 500);
    }
  }

  onMaskClick() {
    this.show = false;
  }

}
