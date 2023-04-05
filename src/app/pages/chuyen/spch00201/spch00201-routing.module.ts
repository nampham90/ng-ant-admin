import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spch00201Component } from './spch00201.component';

const routes: Routes = [
  { path: '', component: Spch00201Component, data: { title: 'Quy trình vận chuyển', key: 'spch00201' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spch00201RoutingModule { }
