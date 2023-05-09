import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spcm01102RoutingModule } from './spcm01102-routing.module';
import { Spcm01102Component } from './spcm01102.component';
import { Tmt050modalModule } from '@app/widget/biz-widget/system/tmt050modal/tmt050modal.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    Spcm01102Component
  ],
  imports: [
    SharedModule,
    Spcm01102RoutingModule,
    Tmt050modalModule,
  ]
})
export class Spcm01102Module { }
