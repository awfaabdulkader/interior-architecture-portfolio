import { Component } from '@angular/core';
import { Education } from './../../../../education.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-education',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './list-education.component.html',
  styleUrl: './list-education.component.css'
})
export class ListEducationComponent {
editEducation(_t16: Education) {
throw new Error('Method not implemented.');
}
  educationList: Education[] = [
    {
      id: 1,
      school: 'FST',
      diploma: 'Architecte d’intérieur',
      yearStart: '2023-09-01',
      yearEnd: '2023-09-01'
    },
    {
      id: 2,
      school: 'FST',
      diploma: 'Architecte d’intérieur',
      yearStart: '2023-09-01',
      yearEnd: '2023-09-01'
    }
  ];
  deleteEducation(id: number | undefined): void {
    if (id !== undefined) {
      // Add logic to delete education by id
      console.log(`Deleting education with id: ${id}`);
    } else {
      console.error('Invalid education id');
    }
  }
}
