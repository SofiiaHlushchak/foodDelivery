import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CardTypeEnum } from '../../shared/enums/card-type.enum';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PrimaryCardComponent } from '../../shared/components/primary-card/primary-card.component';
import { RouterModule } from '@angular/router';
import { RestaurantInterface } from '../../shared/interfaces/restaurant.interface';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../services/loading.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { CATEGORIES } from '../../shared/constants/categories.const';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResponsiveDirective } from '../../shared/directives/responsive.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    PrimaryCardComponent,
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FilterSidebarComponent,
    ResponsiveDirective,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private restaurantsService = inject(RestaurantsService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  searchForm!: FormGroup;
  restaurants$: Observable<RestaurantInterface[]> =
    this.restaurantsService.restaurants$;
  isLoading$: Observable<boolean> = inject(LoadingService).isLoading$;
  isSidebarOpen = false;
  isFiltersSidebarOpen = false;

  categories = CATEGORIES;

  CardTypeEnum = CardTypeEnum;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: [''],
      categories: this.fb.array(
        this.categories.map(() => this.fb.control(false))
      ),
      sortBy: [''],
      rating: [''],
      priceFrom: [null],
      priceTo: [null],
    });

    this.restaurantsService.getCachedRestaurants().subscribe();

    this.searchForm
      .get('searchQuery')!
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.applyFilters());

    this.searchForm
      .get('categories')!
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(categories => {
        this.applyFilters(categories);
      });
  }

  getCategoryValue(index: number): boolean {
    return this.searchForm.get('categories')?.value[index] || false;
  }

  applyFilters(updatedCategories?: boolean[]): void {
    const { categories, searchQuery, ...rest } = this.searchForm.value;
    const selectedCategories = updatedCategories || categories;

    const filteredCategories = this.categories.filter(
      (_, i) => selectedCategories[i]
    );

    this.restaurantsService.setFilters({
      ...rest,
      name: searchQuery?.trim() || '',
      categories: filteredCategories.length ? filteredCategories : undefined,
    });
  }

  onApplySort(): void {
    this.applyFilters();
    this.toggleFiltersSidebar();
  }

  onResetFilters() {
    this.searchForm.reset();
    this.toggleFiltersSidebar();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleFiltersSidebar(): void {
    this.isFiltersSidebarOpen = !this.isFiltersSidebarOpen;
  }

  onToggleFavourite(itemId: string): void {
    this.restaurantsService.toggleFavourite(itemId);
  }
}
