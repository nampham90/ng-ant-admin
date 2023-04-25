import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Spch00351Component } from './spch00351.component';

const routes: Routes = [
  {path: '', component: Spch00351Component, data: { title: 'Cập nhật tiền cước', key: 'spch00351' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Spch00351RoutingModule { }
