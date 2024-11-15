import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DuckService } from '../../core/services/duck.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-duck-viewer',
  templateUrl: './duck-viewer.component.html',
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
    // Initialize form
    this.duckForm = this.fb.group({
      id: ['', [Validators.pattern('^[0-9]*$')]],
      isRandom: [true]
    });
  }

  // Fetch ducks, random if checkbox is selected, otherwise by ID from input
  async fetchDucks(): Promise<void> {
    if (this.duckForm.invalid) return;

    this.loading = true;
    this.error = null;
    this.duckImages = [];

    try {
      if (this.duckForm.get('isRandom')?.value) {
        const response = await lastValueFrom(this.duckService.getRandomDuck());
        if (response?.url) {
          this.duckImages = [response.url];
        }
      } else {
        const id = parseInt(this.duckForm.get('id')?.value);
        if (id) {
          const response = await lastValueFrom(this.duckService.getDuckById(id));
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

  // toggle input mode between random and by ID
  toggleMode(): void {
    const isRandom = this.duckForm.get('isRandom')?.value;
    if (isRandom) {
      this.duckForm.get('id')?.disable();
    } else {
      this.duckForm.get('id')?.enable();
    }
  }
}