import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'spin00251', loadChildren: () => import('./spin00251/spin00251.module').then(m => m.Spin00251Module)},
  { path: 'spin00301', loadChildren: () => import('./spin00301/spin00301.module').then(m => m.Spin00301Module)},
  { path: 'spin00601', loadChildren: () => import('./spin00601/spin00601.module').then(m => m.Spin00601Module)},
  { path: 'spin00801', loadChildren: () => import('./spin00801/spin00801.module').then(m => m.Spin00801Module)},
  { path: 'spin00901', loadChildren: () => import('./spin00901/spin00901.module').then(m => m.Spin00901Module)},
  { path: '', redirectTo: 'spin00301', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrongkhoRoutingModule { }
