import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo2RoutingModule } from './demo2-routing.module';
import { Demo2Component } from './demo2.component';


@NgModule({
  declarations: [
    Demo2Component
  ],
  imports: [
    CommonModule,
    Demo2RoutingModule
  ]
})
export class Demo2Module { }
