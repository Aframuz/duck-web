import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DuckViewerComponent } from './components/duck-viewer/duck-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DuckViewerComponent],
  styleUrl: './app.component.css',
  template: `
    <div class="main min-h-screen bg-yellow-300 flex flex-col">
      <app-duck-viewer class="min-h-screen"></app-duck-viewer>
    </div>
  `,
})
export class AppComponent { }