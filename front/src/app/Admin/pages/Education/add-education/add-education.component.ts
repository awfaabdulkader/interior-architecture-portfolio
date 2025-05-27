import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Education } from '../../../../education.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css'
})
export class AddEducationComponent implements OnInit {
  educationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      yearStart: ['', Validators.required],
      yearEnd: ['', Validators.required],
      diploma: ['', Validators.required],
      school: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      const educationData: Education = this.educationForm.value;
      console.log(educationData);
      // Optionally send to service here
    } else {
      console.log('Form is invalid');
    }
  }
}
