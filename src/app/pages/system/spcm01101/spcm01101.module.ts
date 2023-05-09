import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spcm01101RoutingModule } from './spcm01101-routing.module';
import { Spcm01101Component } from './spcm01101.component';
import { Tmt050modalModule } from '@app/widget/biz-widget/system/tmt050modal/tmt050modal.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    Spcm01101Component
  ],
  imports: [
    SharedModule,
    Spcm01101RoutingModule,
    Tmt050modalModule,
  ]
})
export class Spcm01101Module { }
