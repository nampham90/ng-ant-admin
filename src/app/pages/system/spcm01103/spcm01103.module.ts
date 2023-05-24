import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spcm01103RoutingModule } from './spcm01103-routing.module';
import { Spcm01103Component } from './spcm01103.component';
import { SharedModule } from '@app/shared/shared.module';
import { Tmt050modalModule } from '@app/widget/biz-widget/system/tmt050modal/tmt050modal.module';


@NgModule({
  declarations: [
    Spcm01103Component
  ],
  imports: [
    SharedModule,
    Spcm01103RoutingModule,
    Tmt050modalModule,
  ]
})
export class Spcm01103Module { }