import { Component, OnInit } from '@angular/core';
import { CategoryFormData, category } from '../../../../model/category.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category1: ['', Validators.required],
      category2: [''],
      category3: ['']
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      const categories: category[] = [];

      if (formData.category1.trim()) {
        categories.push({ name: formData.category1.trim() });
      }

      if (formData.category2.trim()) {
        categories.push({ name: formData.category2.trim() });
      }

      if (formData.category3.trim()) {
        categories.push({ name: formData.category3.trim() });
      }

      this.addCategories(categories);
      this.categoryForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  private addCategories(categories: category[]): void {
    console.log('Categories submitted:', categories);
  }
}
