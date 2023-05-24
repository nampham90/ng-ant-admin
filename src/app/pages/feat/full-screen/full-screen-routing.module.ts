import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullScreenComponent } from '@app/pages/feat/full-screen/full-screen.component';

const routes: Routes = [{ path: '', component: FullScreenComponent, data: { title: 'toàn màn hình', key: 'full-screen' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullScreenRoutingModule {}