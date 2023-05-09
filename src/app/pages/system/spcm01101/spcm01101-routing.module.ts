import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spcm01101Component } from './spcm01101.component';

const routes: Routes = [
  { path: '', component: Spcm01101Component, data: { title: 'Quản lý đơn vị tính', key: 'spcm01101' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spcm01101RoutingModule { }
