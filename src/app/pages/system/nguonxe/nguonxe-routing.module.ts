import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NguonxeComponent } from './nguonxe.component';

const routes: Routes = [
  {path: '', component: NguonxeComponent, data: { title: 'Quản lý nguồn xe', key: 'quanlynguonxe' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NguonxeRoutingModule { }
