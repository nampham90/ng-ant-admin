import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo1RoutingModule } from './demo1-routing.module';
import { Demo1Component } from './demo1.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';


@NgModule({
  declarations: [
    Demo1Component
  ],
  imports: [
    NgZorroAntdMobileModule,
    CommonModule,
    Demo1RoutingModule,
  ]
})
export class Demo1Module { }
