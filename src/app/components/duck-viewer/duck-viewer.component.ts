import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DuckService } from '../../core/services/duck.service';

@Component({
  selector: 'app-duck-viewer',
  templateUrl: './duck-viewer.component.html',
  styleUrl: './duck-viewer.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DuckViewerComponent {
  duckForm: FormGroup;
  duckImages: string[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private duckService: DuckService,
    private fb: FormBuilder
  ) {
    this.duckForm = this.fb.group({
      id: ['', [Validators.pattern('^[0-9]*$')]],
      isRandom: [true]
    });
  }

  async fetchDucks(): Promise<void> {
    if (this.duckForm.invalid) return;

    this.loading = true;
    this.error = null;
    this.duckImages = [];

    try {
      if (this.duckForm.get('isRandom')?.value) {
        const response = await this.duckService.getRandomDuck().toPromise();
        if (response?.url) {
          this.duckImages = [response.url];
        }
      } else {
        const id = parseInt(this.duckForm.get('id')?.value);
        if (id) {
          const response = await this.duckService.getDuckById(id).toPromise();
          if (response?.urls) {
            this.duckImages = response.urls;
          }
        }
      }
    } catch (err) {
      this.error = 'Error fetching duck images. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  toggleMode(): void {
    const isRandom = this.duckForm.get('isRandom')?.value;
    if (isRandom) {
      this.duckForm.get('id')?.disable();
    } else {
      this.duckForm.get('id')?.enable();
    }
  }
}