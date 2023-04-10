import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spin00901RoutingModule } from './spin00901-routing.module';
import { Spin00901Component } from './spin00901.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    Spin00901Component
  ],
  imports: [
    SharedModule,
    Spin00901RoutingModule
  ]
})
export class Spin00901Module { }
