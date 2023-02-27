import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00251RoutingModule } from './spch00251-routing.module';
import { Spch00251Component } from './spch00251.component';
import { SharedModule } from '@app/shared/shared.module';
import { SubwindowctchuyenngoaiModule } from '@app/widget/modal/subwindowctchuyenngoai/subwindowctchuyenngoai.module';


@NgModule({
  declarations: [
    Spch00251Component
  ],
  imports: [
    Spch00251RoutingModule,
    SharedModule,
    SubwindowctchuyenngoaiModule
  ]
})
export class Spch00251Module { }
