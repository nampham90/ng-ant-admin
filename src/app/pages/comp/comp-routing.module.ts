import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'transition', loadChildren: () => import('./transition/transition.module').then(m => m.TransitionModule)},
  {path: 'basic', loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule)},
  {path: 'desc', loadChildren: () => import('./desc/desc.module').then(m => m.DescModule)},
  {path: '', redirectTo: 'transition', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompRoutingModule { }