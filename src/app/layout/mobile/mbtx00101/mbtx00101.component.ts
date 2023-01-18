import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mbtx00101',
  templateUrl: './mbtx00101.component.html',
  styleUrls: ['./mbtx00101.component.less']
})
export class Mbtx00101Component implements OnInit {

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
