import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo3RoutingModule } from './demo3-routing.module';
import { Demo3Component } from './demo3.component';


@NgModule({
  declarations: [
    Demo3Component
  ],
  imports: [
    CommonModule,
    Demo3RoutingModule
  ]
})
export class Demo3Module { }
