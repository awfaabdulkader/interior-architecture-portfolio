import { Component } from '@angular/core';
import { Project } from '../../../../model/project.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.css'
})
export class AllProjectsComponent {
  projects: Project[] = [];
  selectedImages: string[] = [];
  expandedDescriptions: Set<number> = new Set(); // Track expanded descriptions by index

  categories = [
    { id: '2d', name: '2D Design' },
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic Style' }
  ];
  

  ngOnInit(): void {
    this.projects = [
      {
        name: 'FST',
        category: '2d',
        description: 'Architect d’intérieur with extended scope Modern minimalist villa design Modern minimalist villa design Modern minimalist villa design ',
        images: ['assets/Image/2d.png', 'assets/Image/2dfloor.jpg'],

      },
      {
        name: 'Villa',
        category: 'modern',
        description: 'Modern minimalist villa design Modern minimalist villa design Modern minimalist villa design Modern minimalist villa design',
        images: ['assets/Image/2d.png'],

      }
    ];
    
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }
  

  showImages(images: string[]): void {
    this.selectedImages = images;
  }

  isDescriptionExpanded(index: number): boolean {
    return this.expandedDescriptions.has(index);
  }

  toggleDescription(index: number): void {
    if (this.expandedDescriptions.has(index)) {
      this.expandedDescriptions.delete(index);
    } else {
      this.expandedDescriptions.add(index);
    }
  }
}
