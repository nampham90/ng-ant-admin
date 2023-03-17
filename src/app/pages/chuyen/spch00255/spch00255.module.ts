import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00255RoutingModule } from './spch00255-routing.module';
import { Spch00255Component } from './spch00255.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    Spch00255Component
  ],
  imports: [
    SharedModule,
    Spch00255RoutingModule
  ]
})
export class Spch00255Module { }
