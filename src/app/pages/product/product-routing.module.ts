import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)},
  { path: 'newproduct', loadChildren: () => import('./newproduct/newproduct.module').then(m => m.NewproductModule)},
  { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
  { path: '', redirectTo: 'search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
