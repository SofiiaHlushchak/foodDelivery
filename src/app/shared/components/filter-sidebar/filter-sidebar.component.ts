import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-filter-sidebar',
  imports: [CommonModule, ReactiveFormsModule, MatSliderModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss'],
})
export class FilterSidebarComponent implements OnInit {
  @Input() searchForm!: FormGroup;
  @Input() categories!: string[];
  @Input() isOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() applySort = new EventEmitter<void>();
  @Output() resetFilters = new EventEmitter<void>();

  public currentCategories = new FormArray<FormControl>([]);

  sortOptions = [
    { value: 'feedbacks', label: 'Popular' },
    { value: 'quickest_delivery', label: 'Nearest me' },
    { value: 'cost_low_to_high', label: 'Cost low to high' },
    { value: 'cost_high_to_low', label: 'Cost high to low' },
  ];

  ngOnInit(): void {
    const categories = this.formCategories?.value || [];
    categories.forEach((value: boolean) => {
      this.currentCategories.push(new FormControl(value));
    });
  }

  get formCategories(): FormArray | null {
    return this.searchForm.get('categories') as FormArray | null;
  }

  get selectedSortByValue(): string {
    return this.searchForm.get('sortBy')?.value;
  }

  get selectedRating(): number {
    return this.searchForm.get('rating')?.value;
  }

  getCategoryValue(index: number): boolean {
    return this.searchForm.get('categories')?.value[index] ?? false;
  }

  applySortClick(): void {
    this.formCategories?.setValue(this.currentCategories.value);
    this.toggleFiltersSidebar();
  }

  resetFiltersClick(): void {
    this.resetFilters.emit();
    this.searchForm.reset();
  }

  toggleFiltersSidebar(): void {
    this.toggleSidebar.emit();
  }
}
