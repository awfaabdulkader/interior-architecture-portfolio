import { category } from './../../../../model/category.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-category',
  standalone: true,
  imports: [],
  templateUrl: './all-category.component.html',
  styleUrl: './all-category.component.css'
})
export class AllCategoryComponent {
  skills :category[] = [
    { id: 1, name: '2D PLAN' },
    { id: 2, name: '3D PLAN' }
  ];
}
