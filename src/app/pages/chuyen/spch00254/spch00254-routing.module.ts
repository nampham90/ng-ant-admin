import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spch00254Component } from './spch00254.component';

const routes: Routes = [
  {path: '', component: Spch00254Component, data: { title: 'Công nợ xe ngoài', key: 'spch00254' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spch00254RoutingModule { }
