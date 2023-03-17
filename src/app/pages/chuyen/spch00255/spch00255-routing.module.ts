import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spch00255Component } from './spch00255.component';

const routes: Routes = [
  {path: '', component: Spch00255Component, data: { title: 'Thanh toán xe ngoài', key: 'spch00255' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spch00255RoutingModule { }
