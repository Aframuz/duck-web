import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DuckViewerComponent } from './features/duck-viewer/duck-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DuckViewerComponent],
  template: `
    <app-duck-viewer></app-duck-viewer>
  `
})
export class AppComponent { }