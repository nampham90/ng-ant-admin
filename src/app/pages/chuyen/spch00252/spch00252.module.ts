import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Spch00252RoutingModule } from './spch00252-routing.module';
import { Spch00252Component } from './spch00252.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    Spch00252Component
  ],
  imports: [
    SharedModule,
    Spch00252RoutingModule
  ]
})
export class Spch00252Module { }
