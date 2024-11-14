import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DuckViewerComponent } from './components/duck-viewer/duck-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DuckViewerComponent],
  template: `
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <h1 class="text-3xl font-bold text-center py-8 bg-white shadow-sm">Duck Image Viewer</h1>
      <app-duck-viewer></app-duck-viewer>
    </div>
  `,
})
export class AppComponent { }