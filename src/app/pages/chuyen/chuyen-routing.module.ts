import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'spch00101', loadChildren: () => import('./spch00101/spch00101.module').then(m => m.Spch00101Module)},
  { path: 'spch00201', loadChildren: () => import('./spch00201/spch00201.module').then(m => m.Spch00201Module)},
  { path: 'spch00251', loadChildren: () => import('./spch00251/spch00251.module').then(m => m.Spch00251Module)},
  { path: 'spch00252', loadChildren: () => import('./spch00252/spch00252.module').then(m => m.Spch00252Module)},
  { path: 'spch00253', loadChildren: () => import('./spch00253/spch00253.module').then(m => m.Spch00253Module)},
  { path: 'spch00254', loadChildren: () => import('./spch00254/spch00254.module').then(m => m.Spch00254Module)},
  { path: 'spch00255', loadChildren: () => import('./spch00255/spch00255.module').then(m => m.Spch00255Module)},
  { path: '', redirectTo: 'spch00101', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChuyenRoutingModule { }