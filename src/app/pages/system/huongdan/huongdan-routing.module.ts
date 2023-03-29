import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HuongdanComponent } from './huongdan.component';

const routes: Routes = [
  {
    path: '',
    component: HuongdanComponent,
    data: { title: 'Hướng dẫn', key: 'huongdan' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuongdanRoutingModule { }
