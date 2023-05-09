import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spcm01102Component } from './spcm01102.component';

const routes: Routes = [
  { path: '', component: Spcm01102Component, data: { title: 'Quản lý chi phí chuyến', key: 'spcm01102' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spcm01102RoutingModule { }
