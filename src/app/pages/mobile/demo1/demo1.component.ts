import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.less']
})
export class Demo1Component implements OnInit {

  @ViewChild('hangdi', { static: true }) hangdi: ViewChild | any;
  @ViewChild('hangve', { static: true }) hangve: ViewChild | any;

  accordions: Array<any> = [];
  thumbStyle = {
    width: '32px',
    height: '32px'
  };

  activeKey = ["0", "1"];

  onChange(event: any) {
    console.log(event);
  }
  constructor() { }

  ngOnInit(): void {
    this.accordions = [
      { 
        title: this.hangdi, 
        child: ['content 1', 'content 1', 'content 1', 'content 1'] 
      },
      {
        title: this.hangve,
        child: ['content 2', 'content 2', 'content 2', 'content 1'],
        inactive: false
      }
    ];
  }

}
