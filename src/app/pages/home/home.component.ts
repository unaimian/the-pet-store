import { Component, OnInit } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories$!: Observable<Category[]>;
  loading = true;
  error = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories().pipe(
      catchError(() => {
        this.error = true;
        return of([]);
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
