import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spch00252Component } from './spch00252.component';

const routes: Routes = [
  {path: '', component: Spch00252Component, data: { title: 'Tìm kiếm chuyến ngoài', key: 'spch00252' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spch00252RoutingModule { }
