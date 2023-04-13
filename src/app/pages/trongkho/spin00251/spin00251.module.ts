import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spin00251RoutingModule } from './spin00251-routing.module';
import { Spin00251Component } from './spin00251.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    Spin00251Component
  ],
  imports: [
    SharedModule,
    Spin00251RoutingModule
  ]
})
export class Spin00251Module { }
