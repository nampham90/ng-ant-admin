import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubwindowvideoyoutubeComponent } from './subwindowvideoyoutube.component';
import { SharedModule } from '@app/shared/shared.module';
import { YouTubePlayerModule } from '@angular/youtube-player'



@NgModule({
  declarations: [
    SubwindowvideoyoutubeComponent
  ],
  imports: [
    SharedModule,
    YouTubePlayerModule
  ]
})
export class SubwindowvideoyoutubeModule { }
