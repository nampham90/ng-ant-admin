import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00251RoutingModule } from './spch00251-routing.module';
import { Spch00251Component } from './spch00251.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    Spch00251Component
  ],
  imports: [
    Spch00251RoutingModule,
    SharedModule

  ]
})
export class Spch00251Module { }
