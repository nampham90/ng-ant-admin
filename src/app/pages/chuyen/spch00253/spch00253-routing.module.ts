import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spch00253Component } from './spch00253.component';

const routes: Routes = [
  {path: '', component: Spch00253Component, data: { title: 'Thu hồi biên lai', key: 'spch00253' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spch00253RoutingModule { }
