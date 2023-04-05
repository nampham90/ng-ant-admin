import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spch00251Component } from './spch00251.component';

const routes: Routes = [
  {path: '', component: Spch00251Component, data: { title: 'Quản lý chuyến ngoài', key: 'spch00251' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spch00251RoutingModule { }
