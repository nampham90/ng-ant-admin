import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.less']
})
export class MobileComponent implements OnInit {

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute
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
      link: 'demo1'
    },
    {
      value: '2',
      label: 'Supermarket',
      link: 'demo2'
    },
    {
      value: '3',
      label: 'Extra',
      link: 'demo2',
      isLeaf: true
    }
  ];

  onChange(value: any) {
    this.valueActive = value;
    switch(value[0]) {
      case "1": {
         this.route.navigateByUrl('mobile/demo1');
         this.show = false;
      }; break;
      case "2": {
        this.route.navigateByUrl('mobile/demo2');
        this.show = false;
      }; break;
      case "3": {
        this.route.navigateByUrl('mobile/demo3');
        this.show = false;
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
