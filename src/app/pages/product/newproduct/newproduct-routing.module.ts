import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewproductComponent } from './newproduct.component';

const routes: Routes = [
  {
    path: '',
    component: NewproductComponent,
    data: { title: 'Thêm mới', key: 'newproduct' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewproductRoutingModule { }
