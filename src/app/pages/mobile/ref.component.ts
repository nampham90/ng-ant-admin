import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refresh-detector',
  template: '',
})
export class RefreshDetectorComponent {
  constructor(private router: Router) {}

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification($event: any) {
    this.router.navigate(['/login']);
  }
}