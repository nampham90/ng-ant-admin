import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spcm01103Component } from './spcm01103.component';

const routes: Routes = [
  { path: '', component: Spcm01103Component, data: { title: 'Dịch vụ thuê ngoài', key: 'spcm01103' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spcm01103RoutingModule { }
